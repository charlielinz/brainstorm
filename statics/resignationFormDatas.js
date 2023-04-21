const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

export const resignationFormDatas = [
  { name: { type: "text", placeholder: "my name is", value: "", error: "" } },
  {
    company: {
      type: "text",
      placeholder: "my company name is",
      value: "",
      error: "",
    },
  },
  {
    position: {
      type: "text",
      placeholder: "my position is",
      value: "",
      error: "",
    },
  },
  {
    recipient: {
      type: "text",
      placeholder: "my boss name is",
      value: "",
      error: "",
    },
  },
  {
    date: { type: "date", placeholder: "", value: formattedDate, error: "" },
  },
  {
    description: {
      type: "textarea",
      placeholder: "the reason of my resignation",
      value: "",
      error: "",
    },
  },
];
