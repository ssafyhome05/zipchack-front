import { ref, watch } from "vue";
import { Modal } from "bootstrap";
import { useForm, useField, Form, Field } from "vee-validate";
import { SERVER_URL } from "@/assets/resources/configs/config.js";
import * as yup from "yup";
import { useUserInfoStore } from "@/stores/userInfoStore.js";
import axios from "axios";

export default {
  components: {
    Form,
    Field,
  },
  setup() {
    const isEditing = ref(false);
    const userStore = useUserInfoStore();

    const schema = yup.object({
      userId: yup.string(),
      userPw: yup.string().required("비밀번호는 필수입니다."),
      userPasswordConfirm: yup
        .string()
        .required("비밀번호는 필수입니다.")
        .oneOf([yup.ref("userPw")], "비밀번호가 일치하지 않습니다."),
      userName: yup
        .string()
        .required("이름은 필수입니다.")
        .min(2, "최소 2글자 이상 입력하세요"),
      userEmail: yup.string(),
      userPhone: yup
        .string()
        .required("전화번호는 필수입니다.")
        .min(11, "유효한 전화번호를 입력해주세요"),
      userZipcode: yup.string().required("우편번호는 필수입니다."),
      userAddress: yup.string().required("주소는 필수입니다."),
      userAddress2: yup.string().notRequired(),
    });

    // Form과 Field 설정
    const { validate, validateField, setFieldValue, errors } = useForm({
      validationSchema: schema,
      initialValues: {
        userId: "",
        userPw: "",
        userPasswordConfirm: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        userZipcode: "",
        userAddress: "",
        userAddress2: "",
      },
    });

    // useField 변수 선언
    const { value: userId, errorMessage: userIdError } = useField("userId");
    const { value: userPw, errorMessage: userPwError } = useField("userPw");
    const {
      value: userPasswordConfirm,
      errorMessage: userPasswordConfirmError,
    } = useField("userPasswordConfirm");
    const { value: userName, errorMessage: userNameError } =
      useField("userName");
    const { value: userEmail, errorMessage: userEmailError } =
      useField("userEmail");
    const { value: userPhone, errorMessage: userPhoneError } =
      useField("userPhone");
    const { value: userZipcode, errorMessage: userZipcodeError } =
      useField("userZipcode");
    const { value: userAddress, errorMessage: userAddressError } =
      useField("userAddress");
    const { value: userAddress2, errorMessage: userAddress2Error } =
      useField("userAddress2");

    // useField 변수 선언 후에 watch 설정
    watch(
      () => userStore.getUser,
      (newUser) => {
        if (newUser) {
          userId.value = newUser.userId || "";
          userName.value = newUser.userName || "";
          userEmail.value = newUser.userEmail || "";
          userPhone.value = newUser.userPhone || "";
          userZipcode.value = newUser.userZipcode || "";
          userAddress.value = newUser.userAddress || "";
          userAddress2.value = newUser.userAddress2 || "";
        } else {
          userId.value = "";
          userName.value = "";
          userEmail.value = "";
          userPhone.value = "";
          userZipcode.value = "";
          userAddress.value = "";
          userAddress2.value = "";
        }
        // 비밀번호 필드 초기화
        userPw.value = "";
        userPasswordConfirm.value = "";
      },
      { immediate: true }
    );

    function closeUserInfoModal() {
      if (isEditing.value) {
        cancelEdit();
      }
      const modalElement = document.getElementById("user-info-modal");
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    function startEdit() {
      isEditing.value = !isEditing.value;
    }

    function cancelEdit() {
      isEditing.value = false;

      if (userStore.getUser) {
        userId.value = userStore.getUser.userId || "";
        userName.value = userStore.getUser.userName || "";
        userPhone.value = userStore.getUser.userPhone || "";
        userZipcode.value = userStore.getUser.userZipcode || "";
        userAddress.value = userStore.getUser.userAddress || "";
        userAddress2.value = userStore.getUser.userAddress2 || "";
      } else {
        userId.value = "";
        userName.value = "";
        userPhone.value = "";
        userZipcode.value = "";
        userAddress.value = "";
        userAddress2.value = "";
      }

      userPw.value = "";
      userPasswordConfirm.value = "";
    }

    // Daum 주소 API
    function openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          userZipcode.value = data.zonecode;
          userAddress.value = data.roadAddress;
        },
      }).open();
    }

    async function updateUserInfo(cnt) {
      if (cnt === 0) return;
      try {
        const response = await axios.put(
          `${SERVER_URL}/api/user/${userStore.getUser.userSeq}`,
          {
            userId: userId.value,
            userPw: userPw.value,
            userPasswordConfirm: userPasswordConfirm.value,
            userName: userName.value,
            userEmail: userEmail.value,
            userPhone: userPhone.value,
            userZipcode: userZipcode.value,
            userAddress: userAddress.value,
            userAddress2: userAddress2.value,
          },
          {
            headers: {
              Authorization: userStore.getAccessToken,
            },
          }
        );

        if (response.status === 200) {
          userStore.setUser(userStore.getAccessToken);
          isEditing.value = false;
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.code === 401012) {
          userStore.reissueAccessToken();
          updateUserInfo(cnt - 1);
        }
      }
    }

    async function deleteUserInfo() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        try {
          await axios.delete(
            `${SERVER_URL}/api/user/${userStore.getUser.userSeq}`,
            {
              headers: {
                Authorization: userStore.getAccessToken,
              },
            }
          );

          userStore.user = null;
          userStore.access_token = null;
          window.location.href = "/";
        } catch (error) {
          console.log(error);
          if (error.response.data.code === 401012) {
            userStore.reissueAccessToken();
            deleteUserInfo();
          }
        }
      }
    }

    return {
      isEditing,
      userEmail,
      userEmailError,
      userName,
      errors,
      userId,
      userIdError,
      userPw,
      userPwError,
      userPasswordConfirm,
      userPasswordConfirmError,
      userName,
      userNameError,
      userPhone,
      userPhoneError,
      userZipcode,
      userZipcodeError,
      userAddress,
      userAddressError,
      userAddress2,
      userAddress2Error,

      closeUserInfoModal,
      updateUserInfo,
      cancelEdit,
      openPostcode,
      startEdit,
      deleteUserInfo,
    };
  },
};
