import { useState } from "react";
import { z, type ZodObject } from "zod";

const useFormData = <T extends Record<string, unknown>>({
  initialValue,
  schemaValidater,
}: {
  initialValue: T;
  schemaValidater: ZodObject<any>;
}) => {
  const [formData, setFormData] = useState<T>(initialValue);

  const [error, setError] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentValue = { ...formData, [name]: value };
    setFormData(currentValue);
    const result = schemaValidater.safeParse(currentValue);
    if (!result.success) {
      const validateError = z.flattenError(result.error).fieldErrors;
      const errorMessage = validateError[name]?.[0];
      if (errorMessage) {
        setError((preError) => ({
          ...preError,
          [name]: errorMessage,
        }));
      } else {
        setError((preError) => {
          const newError = { ...preError };
          delete newError[name];
          return newError;
        });
      }
    } else {
      // Clear error when input is valid
      setError({});
    }
  };

  return {
    error,
    formData,
    handleChange,
  };
};

export default useFormData;
