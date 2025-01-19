using System;
using School;

public interface IStudentProcessor
{
    void SortStudents(Student[] students);
    Student? FindStudentWithAverageScore(Student[] students, double targetAverage);
}