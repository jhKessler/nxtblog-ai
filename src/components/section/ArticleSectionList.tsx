export default function ArticleSectionList({
    items
}: {
    items: string[];
}) {
    return (
        <ul style={{
            listStyleType: 'disc', // equivalent to list-disc
            paddingLeft: '2rem' // equivalent to pl-8
        }}>
            {items.map((item, index) => (
                <li 
                    key={index} 
                    style={{
                        fontSize: '1.125rem', // equivalent to text-lg
                        lineHeight: '1.75rem' // matches the typical leading for text-lg
                    }}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
