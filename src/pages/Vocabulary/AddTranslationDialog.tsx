import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { useCreateTranslation } from "@/hooks";
import type { CreateTranslationRequest } from "@/types";

interface AddTranslationDialogProps {
  visible: boolean;
  onHide: () => void;
}

const validationSchema = Yup.object({
  word: Yup.string()
    .required("Spanish word is required")
    .min(2, "Spanish word must be at least 2 characters"),
  english: Yup.string()
    .required("English translation is required")
    .min(2, "English translation must be at least 2 characters"),
  hungarian: Yup.string()
    .required("Hungarian translation is required")
    .min(2, "Hungarian translation must be at least 2 characters"),
});

export const AddTranslationDialog = ({
  visible,
  onHide,
}: AddTranslationDialogProps) => {
  const createTranslation = useCreateTranslation();
  const toast = useRef<Toast>(null);

  const formik = useFormik({
    initialValues: {
      word: "",
      english: "",
      hungarian: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload: CreateTranslationRequest = {
        word: values.word,
        translations: {
          english: values.english,
          hungarian: values.hungarian,
        },
      };

      try {
        await createTranslation.mutateAsync(payload);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Translation added successfully!",
          life: 3000,
        });
        resetForm();
        onHide();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to create translation";
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: errorMessage,
          life: 5000,
        });
        console.error("Failed to create translation:", error);
      }
    },
  });

  const handleHide = () => {
    formik.resetForm();
    onHide();
  };

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Cancel"
        severity="secondary"
        onClick={handleHide}
        disabled={createTranslation.isPending}
      />
      <Button
        label="Save"
        onClick={() => formik.handleSubmit()}
        loading={createTranslation.isPending}
        disabled={!formik.isValid || !formik.dirty}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} position="bottom-center" />
      <Dialog
        header="Add New Translation"
        visible={visible}
        onHide={handleHide}
        footer={footer}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-4">
          {/* Spanish Word */}
          <div className="flex flex-column gap-2">
            <label htmlFor="word" className="font-semibold">
              Spanish Word *
            </label>
            <InputText
              id="word"
              name="word"
              value={formik.values.word}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.word && formik.errors.word ? "p-invalid" : ""
              }
            />
            {formik.touched.word && formik.errors.word && (
              <small className="p-error">{formik.errors.word}</small>
            )}
          </div>

          {/* English Translation */}
          <div className="flex flex-column gap-2">
            <label htmlFor="english" className="font-semibold">
              English Translation *
            </label>
            <InputText
              id="english"
              name="english"
              value={formik.values.english}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.english && formik.errors.english
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.english && formik.errors.english && (
              <small className="p-error">{formik.errors.english}</small>
            )}
          </div>

          {/* Hungarian Translation */}
          <div className="flex flex-column gap-2">
            <label htmlFor="hungarian" className="font-semibold">
              Hungarian Translation *
            </label>
            <InputText
              id="hungarian"
              name="hungarian"
              value={formik.values.hungarian}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.hungarian && formik.errors.hungarian
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.hungarian && formik.errors.hungarian && (
              <small className="p-error">{formik.errors.hungarian}</small>
            )}
          </div>
        </form>
      </Dialog>
    </>
  );
};
