import { useRouter } from "next/router";
import * as yup from "yup";
import { useFormik } from "formik";
import { mutate, useSWRConfig } from "swr";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  quote: yup.string().required(),
  person: yup.string().required(),
});

function VHelp({ msg }) {
  <div className="invalid-feedback">{msg}</div>;
}

function FieldLabel({ field, label, required }) {
  return (
    <label htmlFor={field} className="form-label">
      <strong>
        {label || field} {required && <span className="text-danger">*</span>}
      </strong>
    </label>
  );
}

export default function QuoteForm({ quote, title }) {
  let router = useRouter();
  let qid = router.query.quote;
  let is_new = qid === undefined;

  const { handleSubmit, handleChange, values, errors } =
    useFormik({
      initialValues: is_new
        ? {
            quote: "",
            person: "",
            likes: 0
          }
        : { ...quote },
      validationSchema,
      onSubmit(values) {
        fetch(`/api/quotes${is_new ? "" : "/" + qid}`, {
          method: is_new ? "POST" : "PUT",
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            router.push("/quotes");
            mutate("/api/quotes");
            mutate("/api/quotes/" + qid);
            toast.success(`Successfully created`);
          })
          .catch((err) => {
            toast.success(`Failed to submit your quote: ${err.message}`);
          });
      },
    });

  function FieldAttrs(field) {
    return {
      className: `form-control ${errors[field] ? "is-invalid" : ""}`,
      id: field,
      name: field,
      value: values[field],
      onChange: handleChange,
    };
  }
  return (
    <div className="container">
      <h2 className="py-3">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="has-validation">
            <FieldLabel field="quote" required />
            <input type="text" {...FieldAttrs("quote")} />
            <VHelp msg={errors.quote} />
          </div>
        </div>
        <div className="mb-3">
          <div className="has-validation">
            <FieldLabel field="person" required />
            <input type="text" {...FieldAttrs("person")} />
            <VHelp msg={errors.quote} />
          </div>
        </div>
        <div className="mb-3">
          <div className="text-end">
            <button type="submit" className="btn btn-primary ms-1">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => router.push("/quotes")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
