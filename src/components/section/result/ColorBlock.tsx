type ColorBlockProps = {
    color: string;
    };

    export default function ColorBlock({ color }: ColorBlockProps) {
    return (
        <div className="color-block" style={{ backgroundColor: color }}>
        <span className="color-code">{color}</span>
        </div>
    );
    }
