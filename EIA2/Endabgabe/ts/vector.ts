namespace Football {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        scale(_factor: number): void {
            this.x *= Number(_factor);
            this.y *= Number(_factor);
        }

        add(_addend: Vector): void {
            this.x += Number(_addend.x.toFixed());
            this.y += Number(_addend.y.toFixed());
        }

        random(_minLength: number, _maxLength: number, _vectorLength: number , _minAngle1: number, _maxAngle1: number, _minAngle2: number, _maxAngle2: number): any {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);

            let direction1: number = _minAngle1 + Math.random() * (_maxAngle1 - _minAngle1);
            let direction2: number = _minAngle2 + Math.random() * (_maxAngle2 - _minAngle2);
            let direction: number = direction1 + Math.random() * (direction1 - direction2);

            let cos: number = Math.cos(direction) * _vectorLength;
            let sin: number = Math.sin(direction) * _vectorLength;

            this.set(Number(cos.toFixed()), Number(sin.toFixed()));
            this.scale(length);
        }

        copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }
}