/* ============ ALL WEDDING DETAILS LIVE HERE ============ */
window.WEDDING = {
  bride: { first: 'Ramyashruthi', last: 'Meeniga', te: 'రమ్యశ్రుతి మీనిగ',
    parents: 'Mr. M. Bhaskar & Mrs. B. Lakshmi Devi', place: 'Kodumur, Andhra Pradesh' },
  groom: { first: 'Shambu', last: 'Nair', ml: 'ശംഭു നായർ',
    parents: 'Late Sri Sasidharan Nair & Smt. Bindhu J S', place: 'Vishnu Priya Bhavan, Thekkinkadu, Kerala' },
  engaged: '30 · 08 · 2026',
  // The wedding (muhurtham) time, in IST. Drives the countdown.
  muhurtham: { iso: '2026-12-03T10:16:00+05:30', label: 'Thursday · 3 December 2026', time: '10:16 AM',
    venue: 'SLNS Function Hall', town: 'Kodumur, Kurnool District, Andhra Pradesh' },
  regards: ['Parvathamma & Linganna', 'Lakshmi Devi & Bhaskar', 'Geetha Priya & Rahul', 'The Meeniga Family'],
  // RSVP goes to WhatsApp. Put a number with country code (e.g. '919876543210') or leave '' to let guests pick a contact.
  whatsapp: '',
  places: {
    kodumur:   { name: 'Kodumur',   lonlat: [77.7833, 15.6833] },
    guruvayur: { name: 'Guruvayur', lonlat: [76.0410, 10.5946] },
    varkala:   { name: 'Varkala',   lonlat: [76.7163, 8.7379] },
  },
  events: [
    { state: 'andhra', key: 'haldi', title: 'Haldi', tag: 'Haldi, Happiness & Hungama', sub: 'A sun-kissed soirée',
      start: '2026-12-01T09:00', hours: 3, day: 'Tuesday', date: '1 Dec', time: '9:00 AM', venue: 'Alok Resort', town: 'Kodumur', color: '#F2B632' },
    { state: 'andhra', key: 'mehendi', title: 'Mehendi', tag: 'Green & Grace', sub: 'The Mehendi Mela',
      start: '2026-12-01T13:00', hours: 4, day: 'Tuesday', date: '1 Dec', time: '1:00 PM', venue: 'Alok Resort', town: 'Kodumur', color: '#4F9A5E' },
    { state: 'andhra', key: 'sangeeth', title: 'Sangeeth', tag: 'Groove Gala', sub: 'Music, dance & masti',
      start: '2026-12-01T18:00', hours: 4, day: 'Tuesday', date: '1 Dec', time: '6:00 PM', venue: 'Alok Resort', town: 'Kodumur', color: '#B5478F' },
    { state: 'andhra', key: 'pellikuthuru', title: 'Pandiri & Pellikuthuru', te: 'పందిరి · పెళ్లికూతురు', tag: 'The Bride Chapter', sub: 'Blessings for the bride',
      start: '2026-12-02T09:00', hours: 3, day: 'Wednesday', date: '2 Dec', time: '9:00 AM', venue: 'Our Residence', town: 'Kodumur', color: '#E2738C' },
    { state: 'andhra', key: 'prereception', title: 'Pre-Wedding Reception', tag: 'An Eternal Evening', sub: 'An evening with family & friends',
      start: '2026-12-02T19:00', hours: 3, day: 'Wednesday', date: '2 Dec', time: '7:00 PM', venue: 'SLNS Function Hall', town: 'Kodumur', color: '#7A4FB0' },
    { state: 'andhra', key: 'wedding', title: 'The Wedding', te: 'శుభ ముహూర్తం', tag: 'Two Cultures, One Forever', sub: 'Muhurtham at 10:16 AM',
      start: '2026-12-03T10:16', hours: 3, day: 'Thursday', date: '3 Dec', time: '10:16 AM', venue: 'SLNS Function Hall', town: 'Kodumur, Kurnool District', color: '#6B1426', hero: true },
    { state: 'kerala', key: 'guruvayur', title: 'Guruvayur Wedding Vows', ml: 'ഗുരുവായൂർ', tag: 'The Eternal Knot', sub: 'Vows before Guruvayurappan',
      start: '2026-12-10T09:00', hours: 2, day: 'Thursday', date: '10 Dec', time: '9:00 AM', venue: 'Guruvayur Temple', town: 'Guruvayur, Kerala', color: '#3F8A5A' },
    { state: 'kerala', key: 'reception', title: 'Reception', tag: 'Happily Ever After', sub: 'Celebrate with us in Kerala',
      start: '2026-12-11T18:00', hours: 4, day: 'Friday', date: '11 Dec', time: '6:00 PM', venue: 'Varkala Palace', town: 'Varkala, Kerala', color: '#C9A24A' },
  ],
};

/* helpers */
WEDDING.calLink = ev => {
  const [d, t] = ev.start.split('T'); const [Y, M, D] = d.split('-').map(Number); const [h, m] = t.split(':').map(Number);
  const s = new Date(Date.UTC(Y, M - 1, D, h, m) - 330 * 60000), e = new Date(s.getTime() + ev.hours * 3600000);
  const f = x => x.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const text = `${ev.title} · Ramyashruthi & Shambu`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${f(s)}/${f(e)}&ctz=Asia/Kolkata&location=${encodeURIComponent(ev.venue + ', ' + ev.town)}&details=${encodeURIComponent('With love, the Meeniga & Nair families')}`;
};
WEDDING.mapLink = ev => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.venue + ', ' + ev.town)}`;
