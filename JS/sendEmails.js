async function sendEmail(emp) {
  let email = await emailjs.send("service_b6awx5k", "template_b2n00or", {
    from_name: "Essam",
    to_name: emp.fName,
    message: "your  admin admit you",
    userName: emp.userName,
    password: emp.password,
    email_to: emp.email,
  });
  return email;
}
export { sendEmail };
