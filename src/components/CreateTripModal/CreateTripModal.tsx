import {Modal} from "@/components/ui/Modal/Modal.tsx";
import {useForm} from "react-hook-form";
import styles from "./CreateTripModal.module.css";
import {useUiState} from "@/hooks/useUiState.ts";
import {ResponseTrip} from "@/types/Trip.ts";
import {CreateTrip} from "@/types/CreateTrip.ts";
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {createTrip} from "@/store/slices/tripsSlice/thunks/createTrip.ts";

export const CreateTripModal = () => {
    const [modalActive, setModalActive] = useUiState("createTripModal");
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = (data: CreateTrip) => {
        dispatch(createTrip.asyncThunk(data));
        setModalActive(false);
    };

    const onHide = () => {
        reset();
    };

    const closeModal = () => {
        setModalActive(false);
    };

    return (
        <Modal className={styles.modalContainer} setModalActive={setModalActive} modalActive={modalActive}
               onHide={onHide}
               title="Create trip">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.modalFieldsWrapper}>
                    <label className={styles.modalLabel} htmlFor="cityName">City
                        <p className={styles.modalError}>{errors?.cityName &&
                            <span>{(errors?.cityName?.message as string) || "Error!"}</span>}</p>
                    </label>
                    <input {...register("cityName", {required: "Required field"})} className={styles.modalField} id="cityName"
                           type="text"
                           placeholder="Please select a city"/>
                    <label className={styles.modalLabel} htmlFor="startDate">Start date
                        <p className={styles.modalError}>{errors?.startDate &&
                            <span>{(errors?.startDate?.message as string) || "Error!"}</span>}</p>
                    </label>
                    <input  {...register("startDate", {required: "Required field"})} className={styles.modalField} id="startDate"
                            type="date"/>
                    <label className={styles.modalLabel} htmlFor="endDate">End date
                        <p className={styles.modalError}>{errors?.to &&
                            <span>{(errors?.endDate?.message as string) || "Error!"}</span>}</p>
                    </label>
                    <input  {...register("endDate", {required: "Required field"})} className={styles.modalField} id="endDate"
                            type="date"/>
                </div>

                <div className={styles.footerModal}>
                    <div className={styles.buttonWrapper}>
                        <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
                        <input type="submit" className={styles.agreeButton}/>Save
                    </div>
                </div>
            </form>
        </Modal>
    );
};
