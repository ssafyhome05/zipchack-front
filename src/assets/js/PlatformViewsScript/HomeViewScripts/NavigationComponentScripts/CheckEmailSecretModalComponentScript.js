import { h, nextTick, ref, watch } from 'vue';
import { Modal } from 'bootstrap';
import { useForm, useField, Form, Field } from 'vee-validate';
import { SERVER_URL } from '@/assets/resources/configs/config.js';
import { toast } from 'vue-sonner';
import { showWarningToast, showSuccessToast, showErrorToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import axios from 'axios';
import { useSignedEmailStore } from '@/stores/signedEmailStore';

export default {
    components: {
        Form,
        Field
    },
    setup() {
        const signedEmailStore = useSignedEmailStore();
        const emailCode = ref("");
        
        // 모달이 열릴 때 타이머 시작
        nextTick(() => {
            const modalElement = document.getElementById('check-email-secret-modal');
            modalElement.addEventListener('shown.bs.modal', () => {
                timerStart();
            });
        });

        watch(signedEmailStore.signedEmail, (newVal) => {
            console.log(newVal);
            // 이메일이 변경될 때도 타이머 재시작
            timerStart();
        });

        // 메인 인증 제한시간
        const Timer = ref(null);
        const TimeCounter = ref(60);
        const TimeStr = ref("05:00");

        const checkVerifyEmail = async () => {

            const email = signedEmailStore.getSignedEmail;
            const code = emailCode.value;
            try{
                const response = await axios.get(`${SERVER_URL}/api/user/check/mail`, 
                    {
                        params: {
                            "email": email,
                            "key": code
                        }
                    }
                );

                signedEmailStore.setPreSignedUserSeq(response.data.data);
                console.log(response.data);
                console.log(signedEmailStore.getPreSignedUserSeq);
                return true;
            }catch(error) {
                console.log(error);
                showWarningToast("이메일 인증 실패, 다시 시도해주세요.");
                return false;
            }
        }

        const timerStart = () => {

            if (Timer.value) {
                timerStop(Timer.value);
            }
        
            TimeCounter.value = 60;
            TimeStr.value = "01:00";

            const interval = setInterval(() => {
                TimeCounter.value--;
        
                const minutes = Math.floor(TimeCounter.value / 60).toString().padStart(2, '0');
                const seconds = (TimeCounter.value % 60).toString().padStart(2, '0');
                TimeStr.value = `${minutes}:${seconds}`;
        
                if (TimeCounter.value <= 0) {
                    timerStop(interval);
                    verifyEmailIsSuccess.value = false;
                }
            }, 1000);
        
            Timer.value = interval;
            return interval;
        };

        function closeCheckEmailSecretModal() {
            const modalElement = document.getElementById('check-email-secret-modal');
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
                emailCode.value = "";
            }
        }

        async function goChangePasswordModal(){
            if(await checkVerifyEmail()){
                closeCheckEmailSecretModal();
                nextTick(() => {
                    const modalElement = document.querySelector('#change-password-modal');
                    if (modalElement) {
                        const modalInstance = new Modal(modalElement);
                        modalInstance.show();
                     }
                });   
            }
        }

        return {

            emailCode,

            
            // 타이머 관련
            Timer,
            TimeCounter,
            TimeStr,
            
            // 모달 관련 메서드
            closeCheckEmailSecretModal,
            goChangePasswordModal,
            
            // 이메일 인증 관련 메서드
            checkVerifyEmail,
            timerStart,
        };
    }
};