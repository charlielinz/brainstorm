const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

export const resignationFormDatas = [
  {
    formField: "name",
    type: "text",
    placeholder: "my name is",
    value: "",
    error: "",
  },
  {
    formField: "company",
    type: "text",
    placeholder: "my company name is",
    value: "",
    error: "",
  },
  {
    formField: "position",
    type: "text",
    placeholder: "my position is",
    value: "",
    error: "",
  },
  {
    formField: "recipient",
    type: "text",
    placeholder: "my boss name is",
    value: "",
    error: "",
  },
  {
    formField: "date",
    type: "date",
    placeholder: "",
    value: formattedDate,
    error: "",
  },
  {
    formField: "description",
    type: "textarea",
    placeholder: "the reason of my resignation",
    value: "",
    error: "",
  },
];
