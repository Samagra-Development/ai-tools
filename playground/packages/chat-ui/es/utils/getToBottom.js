export default function getToBottom(el) {
  return el.scrollHeight - el.scrollTop - el.offsetHeight;
}