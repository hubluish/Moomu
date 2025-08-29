'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ImageBox.module.css';

interface PinterestImage {
    thumbnail_url: string;
    pin_url: string;
}
const ImageBox: React.FC = () => {
    const [images, setImages] = useState<PinterestImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                // localStorage에서 이미지 키워드 가져오기
                const imageKeywordsStr = localStorage.getItem('image_keywords');
                if (!imageKeywordsStr) {
                    throw new Error('이미지 키워드를 찾을 수 없습니다.');
                }

                const imageKeywords = JSON.parse(imageKeywordsStr) as string[];
                console.log('로드된 이미지 키워드:', imageKeywords);

                // 각 키워드에 대해 이미지 가져오기
                const allImages: PinterestImage[] = [];
                for (const keyword of imageKeywords) {
                    const response = await fetch(`/data/pinterest_images/${keyword}.json`);
                    if (!response.ok) {
                        console.error(`${keyword} 이미지 로딩 실패`);
                        continue;
                    }
                    
                    const imageData = await response.json();
                    // 각 키워드당 상위 2개 이미지만 사용
                    allImages.push(...imageData.slice(0, 2));
                }

                setImages(allImages);
            } catch (error) {
                console.error('이미지 로딩 에러:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    if (loading) {
        return <div className={styles.loading}>이미지 로딩 중...</div>;
    }

    if (images.length === 0) {
        return <div className={styles.noImages}>이미지를 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>IMAGES</h2>
            <div className={styles.imageGrid}>
                {images.map((image, index) => (
                    <a 
                        key={index} 
                        href={image.pin_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.imageWrapper}
                    >
                        {image.thumbnail_url?.trim() ? (
                            <Image 
                                src={image.thumbnail_url} 
                                alt="pinterest thumbnail" 
                                className={styles.image}
                                width={130}
                                height={130}
                                loading="lazy"
                            />
                        ) : (
                            <div className={styles.placeholder} />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ImageBox;
