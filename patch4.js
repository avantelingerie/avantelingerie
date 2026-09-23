const fs = require('fs');
let code = fs.readFileSync('apps/web/src/pages/HomePage.jsx', 'utf8');

const component = `\nconst CategoryMedia = ({ video_capa, image, name }) => {
  const videos = video_capa ? video_capa.split(',').map(v => v.trim()).filter(Boolean) : [];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (videos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 4000); // 4 segundos por video
    return () => clearInterval(interval);
  }, [videos.length]);

  if (videos.length === 0) {
    return (
      <img
        src={image}
        alt={name}
        className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover/card:scale-105 brightness-[1.05] contrast-[1.05] md:brightness-110 md:contrast-110"
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-white">
      {videos.map((vid, idx) => (
        <video
          key={idx}
          src={vid}
          className=x`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out group-hover/card:scale-105 brightness-[1.05] contrast-[1.05] md:brightness-110 md:contrast-110 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          autoPlay
          loop
          muted
          playsInline
        />
      ))}
    </div>
  );
};\nexport default function HomePage()`;
code = code.replace('export default function HomePage()', component);

const oldBlock = `{?cat.video_capa ? \([\s\S]*?\\[\s*?video[\s\S]*?playsInline[\s\S]*?\/\>[\r\n\s]*\) : \([\r\n\s]*\<img[\s\S]*?md:contrast-110"[\s\S]*?\/\>[\r\n\s]*\)}`;
const newBlock = `<CategoryMedia video_capa={cat.video_capa} image={cat.image} name={cat.name} />`;
code = code.replace(new RegExp(oldBlock, 'm'), newBlock);

fs.writeFileSync('apps/web/src/pages/HomePage.jsx', code);
console.log('HomePage updated');
