import { nextTick } from "vue";
import { Modal } from "bootstrap";
import { useForm, useField, Form, Field } from "vee-validate";
import { SERVER_URL } from "@/assets/resources/configs/config.js";
import { toast } from "vue-sonner";
import { showWarningToast, showSuccessToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import { useSignedEmailStore } from "@/stores/signedEmailStore";
import * as yup from "yup";
import axios from "axios";

export default {
  components: {
    Form,
    Field,
  },
  setup() {
    const schema = yup.object({
      userId: yup.string(),
      userName: yup
        .string()
        .required("이름은 필수입니다.")
        .min(2, "최소 2글자 이상 입력하세요"),
      userEmail: yup.string(),
    });

    // Form과 Field 설정
    const { validate, validateField, setFieldValue, errors } = useForm({
      validationSchema: schema,
      initialValues: {
        userId: "",
        userName: "",
        userEmail: "",
      },
    });

    // useField 변수 선언
    const { value: userId, errorMessage: userIdError } = useField("userId");
    const { value: userName, errorMessage: userNameError } =
      useField("userName");
    const { value: userEmail, errorMessage: userEmailError } =
      useField("userEmail");

    function closeFindPasswordModal() {
 
      const modalElement = document.getElementById("find-pw-modal");
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
        userId.value = "";
        userName.value = "";
        userEmail.value = "";
      }
    }

    async function goCheckEmailSecret() {
      console.log("goCheckEmailSecret");
      if(await findPw()) {
        console.log("email send")
        closeFindPasswordModal();
        nextTick(() => {
          const modalElement = document.querySelector('#check-email-secret-modal');
          if (modalElement) {
              const modalInstance = new Modal(modalElement);
              modalInstance.show();
          }
        });
      }
      else {
        showWarningToast("아이디와 이름을 확인해주세요.");
      }
      
    }

    async function findPw(){

      const loadingToastId = toast.loading("인증 메일을 전송 중입니다...");

      try{
        const response = await axios.post(`${SERVER_URL}/api/user/find/pw`, {
          userId: userId.value,
        userName: userName.value,
          userEmail: userEmail.value,
        })
        toast.dismiss(loadingToastId);
        const signedEmailStore = useSignedEmailStore();
        signedEmailStore.setSignedEmail(userEmail.value);
        return true;
      }catch(error){
        console.log(error);
        return false;
      }
    }

    return {
      userId,
      userIdError,
      userName,
      userNameError,
      userEmail,
      userEmailError,

      closeFindPasswordModal,
      goCheckEmailSecret,
    };
  },
};
