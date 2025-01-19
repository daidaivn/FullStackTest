using System;

namespace School
{
    public class Student
    {
        public string Name { get; set; }
        public Score Score { get; set; }

        public double AverageScore()
        {
            return (Score.Math + Score.Physic + Score.Chemistry) / 3.0;
        }
    }

    public class Score
    {
        public int Math { get; set; }
        public int Physic { get; set; }
        public int Chemistry { get; set; }
    }
}