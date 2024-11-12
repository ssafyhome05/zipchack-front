import { toast } from 'vue-sonner';

export function showWarningToast(msg) {
    toast.warning(msg, {duration: 2000});
}

export function showSuccessToast(msg) {
    toast.success(msg, {duration: 2000});
}

export function showErrorToast(msg) {
    toast.error(msg, {duration: 2000});
}

export function showInfoToast(msg) {
    toast(msg, {duration: 1500});
}