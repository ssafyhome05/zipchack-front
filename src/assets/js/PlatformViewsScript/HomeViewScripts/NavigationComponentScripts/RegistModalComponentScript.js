import { ref } from 'vue';
import { Modal } from 'bootstrap';
import { useForm, useField, Form, Field } from 'vee-validate';
import { SERVER_URL } from '@/assets/resources/configs/config.js';
import { toast } from 'vue-sonner';
import { showWarningToast, showSuccessToast, showErrorToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import axios from 'axios';
import * as yup from 'yup';
import { errorMessages } from 'vue/compiler-sfc';

export default {
    components: {
        Form,
        Field
    },
    setup() {

        const schema = yup.object({
            userId: yup.string().min(6, "최소 6글자 이상 입력하세요").required("아이디는 필수입니다."),
            userPw: yup.string().required("비밀번호는 필수입니다.").min(8, "최소 8글자 이상 입력하세요"),
            userPasswordConfirm: yup.string().required("비밀번호는 필수입니다.").oneOf([yup.ref('userPw')], "비밀번호가 일치하지 않습니다."),
            userName: yup.string().required("이름은 필수입니다.").min(2, "최소 2글자 이상 입력하세요"),
            userEmail: yup.string().required("이메일은 필수입니다.").email("유효한 이메일을 입력해주세요"),
            userPhone: yup.string().required("전화번호는 필수입니다.").min(11, "유효한 전화번호를 입력해주세요"),
            // .matches(/^\d{3}-\d{3,4}-\d{4}$/, "유효한 전화번호를 입력해주세요"),
            userZipcode: yup.string().required("우편번호는 필수입니다."),
            userAddress: yup.string().required("주소는 필수입니다."),
            userAddress2: yup.string().notRequired(),
            emailCode: yup.string().required("인증코드는 필수입니다."),
        });
    
        const { validate, validateField, setFieldValue, resetForm, handleSubmit, errors } = useForm({
            validationSchema: schema,
        });

        const { value: userId, errorMessage: userIdError } = useField('userId');
        const { value: userPw, errorMessage: userPwError } = useField('userPw');
        const { value: userPasswordConfirm, errorMessage: userPasswordConfirmError } = useField('userPasswordConfirm');
        const { value: userName, errorMessage: userNameError } = useField('userName');
        const { value: userEmail, errorMessage: userEmailError } = useField('userEmail');
        const { value: emailCode, errorMessage: emailCodeError} = useField('emailCode');
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
        const isSendEmail = ref(false);
        const verifyEmailIsSuccess = ref(false);

        // 메인 인증 제한시간
        const Timer = ref(null);
        const TimeCounter = ref(60);
        const TimeStr = ref("01:00");

        const registUser = handleSubmit(async values => {
            if (!duplicateCheckIsSuccess.value) {
                showWarningToast("아이디 중복 확인을 완료해주세요.");
                return;
            }
        
            if (!isSendEmail.value) {
                showWarningToast("이메일 인증을 완료해주세요.");
                return;
            }
        
            if (!verifyEmailIsSuccess.value) {
                showWarningToast("이메일 인증 코드 확인을 완료해주세요.");
                return;
            }
            try{
                const response = await axios.post(`${SERVER_URL}/api/user`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if(response.data.code === 201020){
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

        const idDuplicatedCheck = async () => {
            
            const isUserIdValid = await validateField('userId');
            if (!isUserIdValid.valid) {
                showWarningToast("아이디 형식을 확인해주세요");
                return;
            }

           const id = userId.value;
            try{
                const response = await axios.get(`${SERVER_URL}/api/user/check/duplicate`, {
                    params: {
                        userId: id,
                    }
                });

                if(response.data.code === 200024){
                    showSuccessToast("사용 가능한 아이디입니다.");
                    duplicateCheckIsSuccess.value = true;
                }else{
                    showWarningToast("사용할 수 없는 아이디입니다.");
                    duplicateCheckIsSuccess.value = false;
                }

            }catch(error){
                showWarningToast("사용할 수 없는 아이디입니다.");
                duplicateCheckIsSuccess.value = false;
            }
        }

        const sendVerifyEmail = async () => {
            const isUserEmailValid = await validateField('userEmail');

            if (!isUserEmailValid.valid) {
                showWarningToast("이메일 형식을 확인해주세요");
                return;
            }

            const loadingToastId = toast.loading("인증 메일을 전송 중입니다...");

            const email = userEmail.value;
            try{
                const response = await axios.post(`${SERVER_URL}/api/user/send/mail`, email, 
                    {
                        headers: {
                            'Content-Type': 'application/text;charset=UTF-8'
                        }
                    }
                );

                if(response.data.code === 201021){
                    toast.dismiss(loadingToastId);
                    showSuccessToast(response.data.message);
                    emailCode.value = null;
                    isSendEmail.value = true;

                    timerStart();

                }else{
                    toast.dismiss(loadingToastId);
                    showWarningToast("이메일 전송 실패, 다시 시도해주세요.");
                    isSendEmail.value = true;
                }

            }catch(errer){
                toast.dismiss(loadingToastId);
                showWarningToast("잠시 후에 다시 시도해주세요.");
                isSendEmail.value = true;
            }
        }

        const checkVerifyEmail = async () => {
            const isEmailCodeValid = await validateField('emailCode');

            if (!isEmailCodeValid.valid) {
                showWarningToast("인증 코드를 입력해주세요.");
                return;
            }

            const email = userEmail.value;
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

                console.log(response.data);

            }catch(error) {
                console.log(error);
                showWarningToast("이메일 인증 실패, 다시 시도해주세요.");
                verifyEmailIsSuccess.value = false;
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
        
        const timerStop = (interval) => {
            clearInterval(interval);
            TimeCounter.value = 0;
            TimeStr.value = "01:00";
            Timer.value = null;
        };

        function closeRegistModal() {
            const modalElement = document.getElementById('regist-modal');
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
                document.getElementById('regist-form').reset();
                modalInstance.hide();
            }
        }

        function goLoginModal(){
            closeRegistModal();
            const loginModalElement = document.getElementById('login-modal');
            const loginModalInstance = Modal.getInstance(loginModalElement);
            if (loginModalInstance) {
                document.getElementById('regist-form').reset();
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
            userPw,
            userPwError,
            userPasswordConfirm,
            userPasswordConfirmError,

            // name verify
            userName,
            userNameError,

            // email verify
            userEmail,
            userEmailError,

            // email code verify
            emailCode,
            emailCodeError,

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
            isSendEmail,
            verifyEmailIsSuccess,
            Timer,
            TimeCounter,
            TimeStr,

            // methods
            openPostcode,
            closeRegistModal,
            goLoginModal,
            idDuplicatedCheck,
            sendVerifyEmail,
            checkVerifyEmail,
            registUser,
        };
    }
};