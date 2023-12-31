import Click from "./Click";
class TouchGesture extends Click {
    private lastTouches: Touch[] = [];
    private animationFrame: number | null = null;
    private isAnimating: boolean = false;
    protected boundOnTouchDown:EventListener;
    protected boundOnTouchMove:EventListener
    protected boundOnTouchUp:EventListener

    constructor(canvasId:string) {
        super(canvasId);
        this.boundOnTouchDown = this.onTouchStart.bind(this) as EventListener;
        this.boundOnTouchMove = this.onTouchMove.bind(this) as EventListener;
        this.boundOnTouchUp = this.onTouchEnd.bind(this) as EventListener;
    }

    calculateScale(e:TouchEvent): void {
        if(!this.sticker||!this.sticker.link)return;
            const initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );

            const currentDistance = Math.hypot(
                this.lastTouches[0].clientX - this.lastTouches[1].clientX,
                this.lastTouches[0].clientY - this.lastTouches[1].clientY
            );

            const deltaDistance = currentDistance - initialDistance;

            const newHeight = this.sticker.height - deltaDistance;
            const newWidth = newHeight * this.aspectRatio;

            const deltaX = (this.sticker.width - newWidth) / 2;
            const deltaY = (this.sticker.height - newHeight) / 2;

            this.sticker.width = newWidth;
            this.sticker.height = newHeight;
            let x:number=this.x
            let y:number=this.y
            x += deltaX;
            y += deltaY;
        
    }

    calculateRotation(e: TouchEvent): number {
        if(this.sticker && this.sticker.link){
            if (e.touches.length >= 2) {
                const initialAngle = Math.atan2(
                    this.lastTouches[1].clientY - this.lastTouches[0].clientY,
                    this.lastTouches[1].clientX - this.lastTouches[0].clientX
                );
                const currentAngle = Math.atan2(
                    e.touches[1].clientY - e.touches[0].clientY,
                    e.touches[1].clientX - e.touches[0].clientX
                );
                return this.sticker.rotation + (currentAngle - initialAngle);
            }
            return this.sticker.rotation;
        }
        return 0;
    }

    private animate() {
        if (!this.isAnimating) return;
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
        this.touchDrawImage();
    }

    private stopAnimate() {
        if(!this.animationFrame)return;
        cancelAnimationFrame(this.animationFrame);
        this.isAnimating = false;
    }

    private touchDrawImage() {
        super.drawImage();
    }

    private onTouchStart(e: TouchEvent) {
        e.preventDefault();
        if(e.touches.length >= 2 && this.sticker && this.sticker.link){
            this.isAnimating = true;
            this.selectedImage = false;
            this.lastTouches = Array.from(e.touches);;
            this.animate();
            this.sticker.rotation = this.calculateRotation(e);
            this.calculateScale(e);
            // super.drawImage()
        } else{
            super.onMouseDown(e);
        }
    }

    private onTouchMove(e: TouchEvent) {
        e.preventDefault();
        if(e.touches.length >= 2 && this.sticker && this.sticker.link){
            this.sticker.rotation = this.calculateRotation(e);
            this.calculateScale(e);
            this.lastTouches = Array.from(e.touches);
            // super.drawImage()          
        } else {
            super.onMouseMove(e);
        }
    }

    private onTouchEnd() {
        super.handleCursor(-1, -1);
        this.lastTouches = [];
        super.reset();
        this.clicked = false;
        this.selectedHandle = null;
        this.stopAnimate();
        super.drawImage()
        super.calculateAnchor()
        super.dispatchEvent()
    }
}
export default TouchGesture;