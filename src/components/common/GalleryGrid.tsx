import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

type MediaItem = { src: string; type: 'image' | 'video'; alt: string; tag?: string };

const GALLERY_ROOT = '/images/gallery/nag-tibba';

const MEDIA: MediaItem[] = [
	// base-camp
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img1.jpg`, type: 'image', alt: 'Base camp 1', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img2.jpg`, type: 'image', alt: 'Base camp 2', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img3.jpg`, type: 'image', alt: 'Base camp 3', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img4.jpg`, type: 'image', alt: 'Base camp 4', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img5.jpg`, type: 'image', alt: 'Base camp 5', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img6.jpg`, type: 'image', alt: 'Base camp 6', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img7.jpg`, type: 'image', alt: 'Base camp 7', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/img8.jpg`, type: 'image', alt: 'Base camp 8', tag: 'Base Camp' },
	{ src: `${GALLERY_ROOT}/experiences/base-camp/vdo1.mp4`, type: 'video', alt: 'Base camp video', tag: 'Base Camp' },

	// destination (many)
	...Array.from({ length: 15 }, (_, i) => ({ src: `${GALLERY_ROOT}/experiences/destination/img${i + 1}.jpg`, type: 'image' as const, alt: `Destination ${i + 1}`, tag: 'Destination' })),
	{ src: `${GALLERY_ROOT}/experiences/destination/vdo1.mp4`, type: 'video', alt: 'Destination video', tag: 'Destination' },

	// transportation
	{ src: `${GALLERY_ROOT}/experiences/transportation/img1.webp`, type: 'image', alt: 'Transport 1', tag: 'Transport' },
	{ src: `${GALLERY_ROOT}/experiences/transportation/img2.webp`, type: 'image', alt: 'Transport 2', tag: 'Transport' },
	// single transport video (keep vdo1.mp4 as canonical)
	{ src: `${GALLERY_ROOT}/experiences/transportation/vdo1.mp4`, type: 'video', alt: 'Transport video', tag: 'Transport' },

	// seasons
	/* removed first monsoon image per request */
	{ src: `${GALLERY_ROOT}/seasons/monsoon/img2.webp`, type: 'image', alt: 'Monsoon 2', tag: 'Monsoon' },
	{ src: `${GALLERY_ROOT}/seasons/monsoon/img3.jpg`, type: 'image', alt: 'Monsoon 3', tag: 'Monsoon' },
	{ src: `${GALLERY_ROOT}/seasons/summer/img1.webp`, type: 'image', alt: 'Summer 1', tag: 'Summer' },
	{ src: `${GALLERY_ROOT}/seasons/summer/img2.webp`, type: 'image', alt: 'Summer 2', tag: 'Summer' },
	{ src: `${GALLERY_ROOT}/seasons/summer/img3.webp`, type: 'image', alt: 'Summer 3', tag: 'Summer' },
	{ src: `${GALLERY_ROOT}/seasons/summer/img4.webp`, type: 'image', alt: 'Summer 4', tag: 'Summer' },
	{ src: `${GALLERY_ROOT}/seasons/summer/img5.webp`, type: 'image', alt: 'Summer 5', tag: 'Summer' },
	{ src: `${GALLERY_ROOT}/seasons/winter/img1.jpg`, type: 'image', alt: 'Winter 1', tag: 'Winter' },
	{ src: `${GALLERY_ROOT}/seasons/winter/img2.jpg`, type: 'image', alt: 'Winter 2', tag: 'Winter' },
	{ src: `${GALLERY_ROOT}/seasons/winter/img3.jpg`, type: 'image', alt: 'Winter 3', tag: 'Winter' },
	{ src: `${GALLERY_ROOT}/seasons/winter/img4.jpg`, type: 'image', alt: 'Winter 4', tag: 'Winter' },
	{ src: `${GALLERY_ROOT}/seasons/winter/img5.jpg`, type: 'image', alt: 'Winter 5', tag: 'Winter' },
];

const uniq = (arr: MediaItem[]) => arr.filter((v, i, a) => a.findIndex(x => x.src === v.src) === i);

const GalleryGrid: React.FC = () => {
	const [filter, setFilter] = useState<'all' | 'experiences' | 'seasons'>('all');
	const [sub, setSub] = useState<string | null>(null);
	const [mediaType, setMediaType] = useState<'all' | 'images' | 'videos'>('all');
	// sorting is fixed to Tag → Newest (no UI control)
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const lightRef = useRef<HTMLDivElement | null>(null);

// stable sets for fast membership checks (useMemo to satisfy lint rules)
// These will not change at runtime.
const EXPERIENCE_TAGS = ['Base Camp', 'Destination', 'Transport'];
const SEASON_TAGS = ['Monsoon', 'Summer', 'Winter'];


	const experienceSet = useMemo(() => new Set(['Base Camp', 'Destination', 'Transport']), []);
	const seasonSet = useMemo(() => new Set(['Monsoon', 'Summer', 'Winter']), []);

	// helper: extract numeric part from filename for pseudo 'newest/oldest' sorting
	const extractNumber = (src: string) => {
		const m = src.match(/(\d+)/);
		return m ? parseInt(m[1], 10) : 0;
	};

	const items = useMemo(() => {
		let set = uniq(MEDIA);
		if (filter === 'experiences') set = set.filter(i => i.tag && experienceSet.has(i.tag));
		if (filter === 'seasons') set = set.filter(i => i.tag && seasonSet.has(i.tag));
		if (sub) set = set.filter(i => i.tag === sub);
		return set;
	}, [filter, sub, experienceSet, seasonSet]);

	// open index now refers to index within displayItems
	const open = (i: number) => setOpenIndex(i);
	const close = () => setOpenIndex(null);

	// navigation should use displayItems length so it matches the filtered/sorted view
    

	useEffect(() => {
		if (openIndex !== null) lightRef.current?.focus();
	}, [openIndex]);

	const columnClass = 'columns-1 sm:columns-2 md:columns-3 lg:columns-4';

	// derive counts for badges
	const totalCount = MEDIA.length;
	const imageCount = MEDIA.filter(m => m.type === 'image').length;
	const videoCount = MEDIA.filter(m => m.type === 'video').length;

	// build displayItems applying mediaType filter and sorting
	const displayItems = useMemo(() => {
		let list = items.slice();
		if (mediaType === 'images') list = list.filter(i => i.type === 'image');
		if (mediaType === 'videos') list = list.filter(i => i.type === 'video');

		// group by tag (alphabetical) then newest within each group
		list.sort((a, b) => {
			const ta = (a.tag || '').toLowerCase();
			const tb = (b.tag || '').toLowerCase();
			if (ta === tb) return extractNumber(b.src) - extractNumber(a.src);
			return ta < tb ? -1 : 1;
		});

		return list;
	}, [items, mediaType]);

	// navigation should use displayItems length so it matches the filtered/sorted view
	const next = useCallback(() => setOpenIndex(i => (i === null ? null : (i + 1) % displayItems.length)), [displayItems.length]);
	const prev = useCallback(() => setOpenIndex(i => (i === null ? null : (i - 1 + displayItems.length) % displayItems.length)), [displayItems.length]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (openIndex === null) return;
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [openIndex, next, prev]);

	return (
		<section aria-labelledby="gallery-heading">
			{/* Header moved to page; this component now only renders controls and the grid */}
			<div className="mb-6 text-center">
				<div className="flex flex-wrap gap-3 justify-center">
					<button onClick={() => { setFilter('all'); setSub(null); }} className={`px-3 py-1 rounded-full ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>All <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">{totalCount}</span></button>
					<button onClick={() => { setFilter('experiences'); setSub(null); }} className={`px-3 py-1 rounded-full ${filter === 'experiences' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Experiences</button>
					<button onClick={() => { setFilter('seasons'); setSub(null); }} className={`px-3 py-1 rounded-full ${filter === 'seasons' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>Seasons</button>
					<button onClick={() => setMediaType('all')} className={`px-3 py-1 rounded-full ${mediaType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>All media</button>
					<button onClick={() => setMediaType('images')} className={`px-3 py-1 rounded-full ${mediaType === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Images <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">{imageCount}</span></button>
					<button onClick={() => setMediaType('videos')} className={`px-3 py-1 rounded-full ${mediaType === 'videos' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Videos <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">{videoCount}</span></button>
				</div>
			</div>

			<div className="mb-4 text-center">
				{filter === 'experiences' && (
					<div className="flex gap-3 flex-wrap">
						{EXPERIENCE_TAGS.map((t: string) => (
							<button key={t} onClick={() => setSub(prev => prev === t ? null : t)} className={`px-3 py-1 rounded-md ${sub === t ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>{t}</button>
						))}
					</div>
				)}
				{filter === 'seasons' && (
					<div className="flex gap-3 flex-wrap">
						{SEASON_TAGS.map((t: string) => (
							<button key={t} onClick={() => setSub(prev => prev === t ? null : t)} className={`px-3 py-1 rounded-md ${sub === t ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>{t}</button>
						))}
					</div>
				)}

				{/* sort controls removed per request */}
			</div>

			<div className={`${columnClass} gap-4 space-y-4 mx-auto max-w-6xl`}>
				{displayItems.map((it, i) => (
					<div key={it.src} className="break-inside-avoid">
						<button onClick={() => open(i)} className="block w-full overflow-hidden rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 bg-white">
								{it.type === 'image' ? (
								<img src={it.src} alt={it.alt} className="w-full h-auto object-cover block" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${GALLERY_ROOT}/seasons/winter/img1.jpg`; }} />
							) : (
								<div className="relative">
									<video src={it.src} className="w-full h-auto block" preload="metadata" muted playsInline />
									<div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="bg-black/60 text-white rounded-full p-2">▶</div></div>
								</div>
							)}
							<div className="p-2 text-sm text-gray-700">{it.tag}</div>
						</button>
					</div>
				))}
			</div>

			{openIndex !== null && displayItems[openIndex] && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center"
					role="dialog"
					aria-modal="true"
					onClick={(e) => { if (e.target === e.currentTarget) close(); }}
				>
					<div className="absolute inset-0 bg-black/80 pointer-events-auto" />
					<div ref={lightRef} tabIndex={-1} className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
						<button type="button" onClick={close} aria-label="Close" className="absolute top-3 right-3 text-white bg-black/40 rounded-full p-2 pointer-events-auto z-50">✕</button>

						<div className="bg-transparent rounded-md p-4">
							<div className="mx-auto">
								{displayItems[openIndex].type === 'image' ? (
									<img src={displayItems[openIndex].src} alt={displayItems[openIndex].alt} className="w-full max-h-[70vh] object-contain mx-auto rounded-md shadow-2xl" />
								) : (
									<div className="relative z-0">
										<video src={displayItems[openIndex].src} className="w-full max-h-[70vh] mx-auto rounded-md shadow-2xl" controls autoPlay muted playsInline />
										{/* ensure video doesn't capture pointer-events for controls above it */}
									</div>
								)}
								<div className="mt-3 text-center text-sm text-white">{displayItems[openIndex].alt} — {openIndex + 1} / {displayItems.length}</div>
							</div>

								<div className="mt-4 overflow-x-auto py-2">
								<div className="flex gap-3 items-center z-50">
									{displayItems.map((t, i) => (
										<button key={t.src} type="button" onClick={() => setOpenIndex(i)} className={`rounded-md overflow-hidden ${i === openIndex ? 'ring-2 ring-purple-500' : 'ring-1 ring-black/10'}`}>
											{t.type === 'image' ? (
												<img src={t.src} alt={t.alt} className="w-28 h-16 object-cover block" loading="lazy" />
											) : (
												<div className="w-28 h-16 bg-black/5 flex items-center justify-center text-white">▶</div>
											)}
										</button>
									))}
								</div>
							</div>

							<div className="absolute left-3 top-1/2 -translate-y-1/2 z-50">
								<button type="button" onClick={prev} className="text-white bg-black/40 rounded-full p-2 pointer-events-auto z-50">‹</button>
							</div>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 z-50">
								<button type="button" onClick={next} className="text-white bg-black/40 rounded-full p-2 pointer-events-auto z-50">›</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default GalleryGrid;

