

interface SectionHeaderProps {
  title: string;
  emoji?: string;
  showViewMore?: boolean;
}

export default function SectionHeader({ title, emoji, showViewMore = true }: SectionHeaderProps) {
  return (
    <div className="flex justify-between mb-[16px] items-center">
      <div className="font-bold text-[16px] flex items-center justify-start">
        {emoji && <p className="text-[21px] mr-1">{emoji}</p>}
        <p>{title}</p>
      </div>
      {showViewMore && (
        <div className="text-gray-400 font-semibold cursor-pointer">
          {`View more >`}
        </div>
      )}
    </div>
  );
}
