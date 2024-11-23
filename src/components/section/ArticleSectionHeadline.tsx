export default function ArticleSectionHeadline({
    headline
}: {
    headline: string;
}) {
    return (
        <h2 style={{
            fontSize: '1.5rem', // equivalent to text-2xl
            fontWeight: 'bold', // equivalent to font-bold
            lineHeight: '2rem' // equivalent to leading-relaxed or Tailwind's typical line height for text-2xl
        }}>
            {headline}
        </h2>
    );
}
