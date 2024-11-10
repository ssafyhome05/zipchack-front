import { ref } from 'vue';
import { Modal } from 'bootstrap';
import { useForm, useField, Form, Field } from 'vee-validate';
import { SERVER_URL } from '@/assets/resources/configs/config.js';
import { showWarningToast, showSuccessToast, showErrorToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import axios from 'axios';
import * as yup from 'yup';

export default {
    components: {
        Form,
        Field
    },
    setup() {

        const schema = yup.object({
            userId: yup.string().min(6, "최소 6글자 이상 입력하세요").required("아이디는 필수입니다."),
            userPassword: yup.string().required("비밀번호는 필수입니다.").min(8, "최소 8글자 이상 입력하세요"),
            userPasswordConfirm: yup.string().required("비밀번호는 필수입니다.").oneOf([yup.ref('userPassword')], "비밀번호가 일치하지 않습니다."),
            userName: yup.string().required("이름은 필수입니다.").min(2, "최소 2글자 이상 입력하세요"),
            userEmail: yup.string().required("이메일은 필수입니다.").email("유효한 이메일을 입력해주세요"),
            userPhone: yup.string().required("전화번호는 필수입니다."),
            // .matches(/^\d{3}-\d{3,4}-\d{4}$/, "유효한 전화번호를 입력해주세요"),
            userZipcode: yup.string().required("우편번호는 필수입니다."),
            userAddress: yup.string().required("주소는 필수입니다."),
            userAddress2: yup.string().notRequired(),
            // emailCode: yup.string().required("인증코드는 필수입니다."),
        });
    
        const { errors, handleSubmit } = useForm({
            validationSchema: schema,
        });

        const { value: userId, errorMessage: userIdError } = useField('userId');
        const { value: userPassword, errorMessage: userPasswordError } = useField('userPassword');
        const { value: userPasswordConfirm, errorMessage: userPasswordConfirmError } = useField('userPasswordConfirm');
        const { value: userName, errorMessage: userNameError } = useField('userName');
        const { value: userEmail, errorMessage: userEmailError } = useField('userEmail');
        const { value: userPhone, errorMessage: userPhoneError } = useField('userPhone');
        const { value: userZipcode, errorMessage: userZipcodeError } = useField('userZipcode');
        const { value: userAddress, errorMessage: userAddressError } = useField('userAddress');
        const { value: userAddress2, errorMessage: userAddress2Error } = useField('userAddress2');
        // 주소
        // const zonecode = ref("");
        // const roadAddress = ref("");
        // const detailAddress = ref("");

        // 인증
        const duplicateCheckIsSuccess = ref(false);
        const verifyEmailIsSuccess = ref(false);
        const passwordConfirmIsSuccess = ref(false);
        const verifyEmailCode = ref("");

        // 메인 인증 제한시간
        const Timer = ref(null);
        const TimeCounter = ref(60);
        const TimeStr = ref("01:00");

        const registUser = handleSubmit(async values => {
            try{
                const response = await axios.post(`${SERVER_URL}/api/user`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if(response.status === 201){
                    showSuccessToast("회원가입이 완료되었습니다.");

                    document.getElementById('regist-form').reset();
                    closeRegistModal();
                    goLoginModal();
                }else{
                    showWarningToast("회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.");
                }
            } catch (error) {
                showErrorToast("회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.");
            }
        });

        function closeRegistModal() {
            const modalElement = document.getElementById('regist-modal');
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }

        function goLoginModal(){
            closeRegistModal();
            const loginModalElement = document.getElementById('login-modal');
            const loginModalInstance = Modal.getInstance(loginModalElement);
            if (loginModalInstance) {
                loginModalInstance.show();
            }
        }

        // Daum 주소 API
        function openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
                    userZipcode.value = data.zonecode;
                    userAddress.value = data.roadAddress;
                },
            }).open();
        };

        return {
            // formdata
            // errors
            errors,

            // id verify
            userId,
            userIdError,

            // password verify
            userPassword,
            userPasswordError,
            userPasswordConfirm,
            userPasswordConfirmError,

            // name verify
            userName,
            userNameError,

            // email verify
            userEmail,
            userEmailError,

            // email code verify
            // emailCode,
            // emailCodeError,

            // tel verify
            userPhone,
            userPhoneError,

            // postcode verify
            userZipcode,
            userZipcodeError,

            // roadAddress verify
            userAddress,
            userAddressError,

            // detailAddress verify
            userAddress2,
            userAddress2Error,

            // data
            // zonecode,
            // roadAddress,
            // detailAddress,
            duplicateCheckIsSuccess,
            verifyEmailIsSuccess,
            passwordConfirmIsSuccess,
            Timer,
            TimeCounter,
            TimeStr,

            // methods
            openPostcode,
            closeRegistModal,
            goLoginModal,
            registUser,
        };
    }
};