const submitForm = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;

  if (validForm({ name, email, comment })) {
    alert("mensagem enviada com sucesso");
  } else {
    alert("Ooops, todos os campos");
  }
};

const validForm = (comment) =>
  comment.name !== "" && comment.email !== "" && comment.comment !== "";
