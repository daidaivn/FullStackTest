using System;
using Microsoft.Extensions.DependencyInjection;
using School;

class Program
{
    static void Main()
    {
        // Cấu hình UTF-8
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        // Cấu hình Dependency Injection
        var serviceProvider = new ServiceCollection()
            .AddSingleton<IStudentProcessor, StudentProcessor>()
            .BuildServiceProvider();

        var studentProcessor = serviceProvider.GetService<IStudentProcessor>();

        if (studentProcessor != null)
        {
            Student[] students = new Student[]
            {
                new Student { Name = "Nguyen Van A", Score = new Score { Math = 10, Physic = 9, Chemistry = 8 } },
                new Student { Name = "Tran Thi B", Score = new Score { Math = 8, Physic = 8, Chemistry = 8 } },
                new Student { Name = "Le Van C", Score = new Score { Math = 7, Physic = 9, Chemistry = 8 } },
                new Student { Name = "Pham Thi L", Score = new Score { Math = 6, Physic = 7, Chemistry = 8 } },
                new Student { Name = "Nguyen Van D", Score = new Score { Math = 8, Physic = 7, Chemistry = 9 } },
                new Student { Name = "Nguyen Van E", Score = new Score { Math = 9, Physic = 8, Chemistry = 7 } },
                new Student { Name = "Nguyen Van F", Score = new Score { Math = 7, Physic = 8, Chemistry = 9 } },
                new Student { Name = "Nguyen Van G", Score = new Score { Math = 8, Physic = 9, Chemistry = 7 } },
                new Student { Name = "Nguyen Van I", Score = new Score { Math = 8, Physic = 10, Chemistry = 7 } },
                new Student { Name = "Nguyen Van K", Score = new Score { Math = 7, Physic = 8, Chemistry = 9 } },
                new Student { Name = "Nguyen Van H", Score = new Score { Math = 9, Physic = 7, Chemistry = 8 } },
                new Student { Name = "Hoang Van M", Score = new Score { Math = 9, Physic = 6, Chemistry = 7 } }
            };

            // Sắp xếp sinh viên
            studentProcessor.SortStudents(students);

            // Hiển thị danh sách sinh viên đã sắp xếp
            Console.WriteLine("Câu 1: Sắp xếp theo thứ tự điểm trung bình các môn giảm dần. Với điểm trung bình bằng nhau thì sắp xếp name theo alphabel:");
            foreach (var student in students)
            {
                Console.WriteLine($"{Array.IndexOf(students, student) + 1}: {student.Name}, Điểm trung bình các môn: {student.AverageScore()}");
            }
            Console.WriteLine("--------------------------------");
            // Tìm sinh viên có điểm trung bình bằng 8
            Student? result = studentProcessor.FindStudentWithAverageScore(students, 8);
            Console.WriteLine("Câu 2: Tìm sinh viên có điểm trung bình bằng 8 với mảng đã sắp xếp:");
            if (result != null)
                Console.WriteLine($"Tìm thấy sinh viên: {result.Name} với điểm trung bình là 8");
            else
                Console.WriteLine("Không tìm thấy sinh viên nào có điểm trung bình là 8");
        }
        else
        {
            Console.WriteLine("StudentProcessor không khả dụng.");
        }
    }
}
