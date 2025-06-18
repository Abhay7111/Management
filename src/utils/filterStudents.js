export const filterStudents = (students, filters) => {
  if (!students || !Array.isArray(students)) return [];

  return students.filter(student => {
    const searchLower = String(filters.search || '').toLowerCase();
    const collegeLower = String(filters.college || '').toLowerCase();
    const rankLower = String(filters.rank || '').toLowerCase();
    const marksLower = String(filters.marks || '').toLowerCase();

    const fullName = `${String(student.students?.name?.firstname || '')} ${String(student.students?.name?.lastname || '')}`.toLowerCase();
    const college = String(student.collegename || '').toLowerCase();
    const email = String(student.students?.gmail || '').toLowerCase();
    const phone = String(student.students?.phone || '');
    const rank = String(student.students?.rank || '').toLowerCase();
    const marks = String(student.students?.marks || '').toLowerCase();

    const matchesSearch = !filters.search || 
      fullName.includes(searchLower) ||
      email.includes(searchLower) ||
      phone.includes(searchLower);

    const matchesCollege = !filters.college || college.includes(collegeLower);
    const matchesRank = !filters.rank || rank.includes(rankLower);
    const matchesMarks = !filters.marks || marks.includes(marksLower);

    return matchesSearch && matchesCollege && matchesRank && matchesMarks;
  });
};