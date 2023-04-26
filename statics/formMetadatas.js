const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

export const resignationFormDatas = [
  {
    label: "name",
    type: "text",
    placeholder: "my name is",
    value: "",
    error: "",
  },
  {
    label: "company",
    type: "text",
    placeholder: "my company name is",
    value: "",
    error: "",
  },
  {
    label: "position",
    type: "text",
    placeholder: "my position is",
    value: "",
    error: "",
  },
  {
    label: "recipient",
    type: "text",
    placeholder: "my boss name is",
    value: "",
    error: "",
  },
  {
    label: "date",
    type: "date",
    placeholder: "",
    value: formattedDate,
    error: "",
  },
  {
    label: "description",
    type: "textarea",
    placeholder: "the reason of my resignation",
    value: "",
    error: "",
  },
];
