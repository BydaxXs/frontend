import { toast } from "react-hot-toast";

const customToast = (tipo, msg) => {
    switch(tipo){
        case 'success':
            toast.success(msg, {
                duration: 5000,
                position: "bottom-right"
            });
            break;
        case 'error':
            toast.error(msg, {
                duration: 5000,
                position: "bottom-right"
            });
            break;
        default:
            toast(msg);
            break;
    }
}
export default customToast;