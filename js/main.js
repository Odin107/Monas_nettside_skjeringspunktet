// Om Oss – toggle between Kai and Mona
document.querySelectorAll('.person-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const person = btn.dataset.person;

    document.querySelectorAll('.person-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.person-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(person + '-content').classList.remove('hidden');
  });
});
