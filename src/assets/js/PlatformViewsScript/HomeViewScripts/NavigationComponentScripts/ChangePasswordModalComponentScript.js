import { ref, nextTick } from 'vue';
import { Modal } from 'bootstrap';
import { useForm, useField, Form, Field } from 'vee-validate';
import { SERVER_URL } from '@/assets/resources/configs/config.js';
import { toast } from 'vue-sonner';
import { showWarningToast, showSuccessToast, showErrorToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import axios from 'axios';
import * as yup from 'yup';
import { errorMessages } from 'vue/compiler-sfc';
import { useSignedEmailStore } from '@/stores/signedEmailStore';

export default {
    components: {
        Form,
        Field
    },
    setup() {

        const signedEmailStore = useSignedEmailStore();
        const schema = yup.object({
            userPw: yup.string().required("비밀번호는 필수입니다.").min(8, "최소 8글자 이상 입력하세요"),
            userPasswordConfirm: yup.string().required("비밀번호는 필수입니다.").oneOf([yup.ref('userPw')], "비밀번호가 일치하지 않습니다."),
        });
    
        const { validate, validateField, setFieldValue, resetForm, handleSubmit, errors } = useForm({
            validationSchema: schema,
        });

        const { value: userPw, errorMessage: userPwError } = useField('userPw');
        const { value: userPasswordConfirm, errorMessage: userPasswordConfirmError } = useField('userPasswordConfirm');

        function closeChangePasswordModal() {
            const modalElement = document.getElementById('change-password-modal');
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
                userPw.value = "";
                userPasswordConfirm.value = "";
            }
        }

        async function changePassword(){
            console.log(signedEmailStore.getPreSignedUserSeq);
            try{
                const response = await axios.patch(`${SERVER_URL}/api/user`, {
                    userSeq: signedEmailStore.getPreSignedUserSeq,
                    newPassword: userPw.value,
                    newPasswordConfirm: userPasswordConfirm.value,
                });
                return true;
            }catch(error){
                console.log(error);
                showWarningToast("비밀번호 변경 실패, 다시 시도해주세요.");
                return false;
            }
        }

        async function goLoginModal(){
            if (await changePassword()){
                closeChangePasswordModal();
                nextTick(() => {
                const modalElement = document.querySelector('#login-modal');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                }
            });   
            }
        };

        return {
            // 폼 유효성 검사
            errors,

            // 비밀번호 관련
            userPw,
            userPwError,
            userPasswordConfirm,
            userPasswordConfirmError,

            // 메서드
            closeChangePasswordModal,
            goLoginModal,
        };
    }
};