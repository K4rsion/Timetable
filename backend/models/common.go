package models

type Common struct {
	Teachers   []Teacher   `json:"teachers"`
	Groups     []Group     `json:"groups"`
	Classrooms []Classroom `json:"classrooms"`
	Subjects   []Subject   `json:"subjects"`
}
