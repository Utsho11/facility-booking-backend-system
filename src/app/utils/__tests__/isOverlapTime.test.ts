import { parseTime } from '../isOverlapTime';

describe('Time Parsing and Interval Overlap Calculations', () => {
  describe('parseTime', () => {
    it('should correctly convert 00:00 to 0 minutes', () => {
      expect(parseTime('00:00')).toBe(0);
    });

    it('should correctly convert 08:30 to 510 minutes', () => {
      expect(parseTime('08:30')).toBe(8 * 60 + 30);
    });

    it('should correctly convert 23:59 to 1439 minutes', () => {
      expect(parseTime('23:59')).toBe(23 * 60 + 59);
    });
  });

  describe('Standard Interval Overlap Logic (A.start < B.end && A.end > B.start)', () => {
    const isOverlapping = (
      startA: string,
      endA: string,
      startB: string,
      endB: string,
    ) => {
      const aStart = parseTime(startA);
      const aEnd = parseTime(endA);
      const bStart = parseTime(startB);
      const bEnd = parseTime(endB);

      return aStart < bEnd && aEnd > bStart;
    };

    it('should detect exact match overlap', () => {
      expect(isOverlapping('10:00', '12:00', '10:00', '12:00')).toBe(true);
    });

    it('should detect when request encompasses existing booking (09:00-13:00 vs 10:00-12:00)', () => {
      expect(isOverlapping('09:00', '13:00', '10:00', '12:00')).toBe(true);
    });

    it('should detect when request is inside existing booking (10:30-11:30 vs 10:00-12:00)', () => {
      expect(isOverlapping('10:30', '11:30', '10:00', '12:00')).toBe(true);
    });

    it('should detect start overlap (09:30-11:00 vs 10:00-12:00)', () => {
      expect(isOverlapping('09:30', '11:00', '10:00', '12:00')).toBe(true);
    });

    it('should detect end overlap (11:00-13:00 vs 10:00-12:00)', () => {
      expect(isOverlapping('11:00', '13:00', '10:00', '12:00')).toBe(true);
    });

    it('should allow adjacent non-overlapping slots (08:00-10:00 vs 10:00-12:00)', () => {
      expect(isOverlapping('08:00', '10:00', '10:00', '12:00')).toBe(false);
    });

    it('should allow subsequent non-overlapping slots (12:00-14:00 vs 10:00-12:00)', () => {
      expect(isOverlapping('12:00', '14:00', '10:00', '12:00')).toBe(false);
    });
  });
});
