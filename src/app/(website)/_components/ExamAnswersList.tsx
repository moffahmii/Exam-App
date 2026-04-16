export function AnswersList({
  answers,
  selected,
  onSelect,
}) {
  return (
    <div className="space-y-4">
      {answers.map((a) => (
        <label
          key={a.id}
          className={`p-4 border rounded-lg cursor-pointer ${selected === a.id ? "bg-gray-200" : ""
            }`}
        >
          <input
            type="radio"
            checked={selected === a.id}
            onChange={() => onSelect(a.id)}
          />
          {a.text}
        </label>
      ))}
    </div>
  );
}