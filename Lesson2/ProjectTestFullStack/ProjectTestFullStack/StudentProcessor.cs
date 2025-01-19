using System;
using School;

public class StudentProcessor : IStudentProcessor
{
    // Sắp xếp danh sách sinh viên theo điểm trung bình giảm dần
    public void SortStudents(Student[] students)
    {
        // Sử dụng thuật toán sắp xếp nổi bọt (Bubble Sort)
        // Mỗi vòng lặp bên ngoài đảm bảo rằng sinh viên lớn nhất (về thứ tự ưu tiên) được đặt đúng vị trí
        for (int i = 0; i < students.Length - 1; i++)
        {
            // So sánh sinh viên ở vị trí i với các sinh viên phía sau (j > i)
            for (int j = i + 1; j < students.Length; j++)
            {
                // Điều kiện hoán đổi: 
                // 1. Điểm trung bình của sinh viên i nhỏ hơn sinh viên j
                // 2. Hoặc, nếu điểm trung bình bằng nhau, kiểm tra tên theo thứ tự alphabet
                if (students[i].AverageScore() < students[j].AverageScore() || // Sinh viên j có điểm cao hơn
                    (students[i].AverageScore() == students[j].AverageScore() && // Điểm bằng nhau
                    string.Compare(students[i].Name, students[j].Name) > 0))    // Tên i đứng sau tên j
                {
                    // Hoán đổi vị trí hai sinh viên
                    Student temp = students[i];    // Lưu tạm sinh viên i
                    students[i] = students[j];     // Đặt sinh viên j vào vị trí i
                    students[j] = temp;            // Đặt sinh viên i vào vị trí j
                }
            }
        }
    }


    // Tìm sinh viên có điểm trung bình gần với giá trị targetAverage
    public Student? FindStudentWithAverageScore(Student[] students, double targetAverage)
    {
        int left = 0;
        int right = students.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;
            double midAverage = students[mid].AverageScore();

            if (Math.Abs(midAverage - targetAverage) < 0.0001)
            {
                return students[mid]; // Tìm thấy sinh viên có điểm trung bình bằng targetAverage
            }
            else if (midAverage < targetAverage)
            {
                left = mid + 1; // Tiếp tục tìm kiếm ở nửa phải
            }
            else
            {
                right = mid - 1; // Tiếp tục tìm kiếm ở nửa trái
            }
        }

        return null; // Không tìm thấy sinh viên nào có điểm trung bình bằng targetAverage
    }
}