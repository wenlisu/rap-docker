Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(data, cursor, limit) {
        this.to = this.moveTo;
        this.toPrev = this.moveToPrev;
        this.toNext = this.moveToNext;
        this.toFirst = this.moveToFirst;
        this.toLast = this.moveToLast;
        this.data = (typeof data === 'number' || typeof data === 'string') ? undefined : data;
        this.total = this.data ? this.data.length : parseInt(data, 10);
        this.cursor = parseInt(cursor, 10);
        this.limit = parseInt(limit, 10);
        this.calc();
    }
    calc() {
        if (this.total && parseInt(this.total, 10) > 0) {
            this.limit = this.limit < 1 ? 1 : this.limit;
            this.pages = (this.total % this.limit === 0) ? this.total / this.limit : this.total / this.limit + 1;
            this.pages = parseInt(this.pages, 10);
            this.cursor = (this.cursor > this.pages) ? this.pages : this.cursor;
            this.cursor = (this.cursor < 1) ? this.pages > 0 ? 1 : 0 : this.cursor;
            this.start = (this.cursor - 1) * this.limit;
            this.start = (this.start < 0) ? 0 : this.start;
            this.end = (this.start + this.limit > this.total) ? this.total : this.start + this.limit;
            this.end = (this.total < this.limit) ? this.total : this.end;
            this.hasPrev = (this.cursor > 1);
            this.hasNext = (this.cursor < this.pages);
            this.hasFirst = this.hasPrev;
            this.hasLast = this.hasNext;
            this.prev = this.hasPrev ? this.cursor - 1 : 0;
            this.next = this.hasNext ? this.cursor + 1 : 0;
            this.first = this.hasFirst ? 1 : 0;
            this.last = this.hasLast ? this.pages : 0;
            this.focus = this.focus ? this.focus : 0;
            this.focus = this.focus % this.limit + this.start;
            this.focus = this.focus > this.end - 1 ? this.end - 1 : this.focus;
        }
        else {
            this.pages = this.cursor = this.start = this.end = 0;
            this.hasPrev = this.hasNext = this.hasFirst = this.hasLast = false;
            this.prev = this.next = this.first = this.last = 0;
            this.focus = 0;
        }
        return this;
    }
    moveTo(cursor) {
        this.cursor = parseInt(cursor, 10);
        return this.calc();
    }
    moveToPrev() {
        return this.moveTo(this.cursor - 1);
    }
    moveToNext() {
        return this.moveTo(this.cursor + 1);
    }
    moveToFirst() {
        return this.moveTo(1);
    }
    moveToLast() {
        return this.moveTo(this.pages);
    }
    fetch(arr) {
        return (arr || this.data).slice(this.start, this.end);
    }
    setData(data) {
        this.data = data;
        this.total = data.length;
        return this.calc();
    }
    setTotal(total) {
        this.total = parseInt(total, 10);
        return this.calc();
    }
    setCursor(cursor) {
        this.cursor = parseInt(cursor, 10);
        return this.calc();
    }
    setFocus(focus) {
        this.focus = parseInt(focus, 10);
        if (this.focus < 0)
            this.focus += this.total;
        if (this.focus >= this.total)
            this.focus -= this.total;
        this.cursor = parseInt(String(this.focus / this.limit), 10) + 1;
        return this.calc();
    }
    setLimit(limit) {
        this.limit = parseInt(limit, 10);
        return this.calc();
    }
    get(focus) {
        if (focus !== undefined)
            return this.data[focus % this.data.length];
        else
            return this.data[this.focus];
    }
    toString() {
        return JSON.stringify(this, undefined, 4);
    }
}
exports.default = Pagination;
//# sourceMappingURL=pagination.js.map