import ky from "ky";

const data = {
  name: "service request",
  value: 9,
  tooltip: "Custom tooltip shown on hover",
  children: [
    {
      name: "custom tooltip",
      value: 3,

      // Each node can specify a "tooltip" to be shown on hover.
      // By default, the node's "name" will be used for this.
      tooltip: "Custom tooltip shown on hover",
    },
    {
      name: "custom colors",

      // Each node can also provide a custom "backgroundColor" or text "color".
      backgroundColor: "#35f",
      color: "#fff",

      value: 3,
      children: [
        {
          name: "leaf",
          value: 2,
        },
      ],
    },
    {
      name: "custom colors",

      // Each node can also provide a custom "backgroundColor" or text "color".
      backgroundColor: "#35f",
      color: "#fff",

      value: 3,
      children: [
        {
          name: "leaf",
          value: 2,
        },
      ],
    },
  ],
};

async function call(apiUrl, action, session) {
  const result = (
    await ky.post(`${apiUrl}/hackathon/actions/${action}`, {
      timeout: 60000,
      headers: {
        authorization: `Bearer ${session.data.idToken}`,
      },
    })
  ).json();

  return result;
}

export default call;
