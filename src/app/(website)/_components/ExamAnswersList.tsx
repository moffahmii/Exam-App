// تعريف نوع بيانات الإجابة الواحدة
interface Answer {
  id: string; // (أو number إذا كانت الـ IDs في قاعدة بياناتك عبارة عن أرقام)
  text: string;
}
interface AnswersListProps {
  answers: Answer[];
  selected: string | null; // استخدمنا null تحسباً لأنه قد لا يكون هناك إجابة محددة في البداية
  onSelect: (id: string) => void;
}

export function AnswersList({
  answers,
  selected,
  onSelect,
}: AnswersListProps) {
  return (
    <div className="space-y-4">
      {answers.map((a) => (
        <label
          key={a.id}
          className={`p-4  bg-gray-50 cursor-pointer flex items-center gap-3 text-sm font-normal text-gray-800 ${selected === a.id ? "bg-gray-200" : ""
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