import Image from 'next/image';
import Link from 'next/link';

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

export default function ArticlePreview({
    title,
    description,
    createdAt,
    path,
    imageUrl,
    accentColor = '#2563eb',
    theme = 'LIGHT'
}: {
    title: string
    description: string
    createdAt: Date
    path: string
    imageUrl: string | null
    accentColor?: string
    theme?: 'LIGHT' | 'DARK'
}) {
    const colors = theme === 'DARK'
        ? {
            background: '#2d3748',
            text: '#e2e8f0',
            description: '#cbd5e0',
            date: '#a0aec0',
            placeholderBg: '#4a5568',
            placeholderColor: '#cbd5e0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -1px rgba(0,0,0,0.3)',
        }
        : {
            background: '#ffffff',
            text: '#2d3748',
            description: '#718096',
            date: '#a0aec0',
            placeholderBg: '#f7fafc',
            placeholderColor: '#cbd5e0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        };

    return (
        <Link href={path} 
            style={{
                backgroundColor: colors.background,
                borderRadius: '0.5rem',
                boxShadow: colors.boxShadow,
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    position: 'relative',
                    height: '12rem',
                    width: '100%'
                }}
            >
                    {imageUrl ? (<img
                        src={imageUrl}
                        alt={title}
                        style={{ objectFit: 'cover' }}
                    />) : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                width: '100%',
                                backgroundColor: colors.placeholderBg
                            }}
                        >
                            <div
                                style={{
                                    color: colors.placeholderColor,
                                    fontSize: '2.25rem',
                                    lineHeight: '2.5rem',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                📷
                            </div>
                        </div>)}
            </div>
            <div
                style={{
                    padding: '1.5rem',
                    height: '12rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div>
                    <h2
                        style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: colors.text
                        }}
                    >
                        <div
                            style={{
                                color: accentColor,
                                textDecoration: 'none'
                            }}
                        >
                            {title}
                        </div>
                    </h2>
                    <p
                        style={{
                            color: colors.description,
                            marginBottom: '1rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3
                        }}
                    >
                        {description}
                    </p>
                </div>
                <div>
                    <p style={{ fontSize: '0.875rem', color: colors.date }}>
                        {formatDate(createdAt)}
                    </p>
                </div>
            </div>
        </Link>
    )
}
