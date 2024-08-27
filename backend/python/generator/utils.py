import json
import random
from costs import check_hard_constraints, subjects_order_cost, empty_space_groups_cost, empty_space_teachers_cost, \
    free_hour
from model import Class, Classroom, Data


def load_data(file_path, teachers_empty_space, groups_empty_space, subjects_order):
    """
    Loads and processes input data, initialises helper structures.
    :param file_path: path to file with input data
    :param teachers_empty_space: dictionary where key = name of the teacher, values = list of rows where it is in
    :param groups_empty_space: dictionary where key = group index, values = list of rows where it is in
    :param subjects_order: dictionary where key = (name of the subject, index of the group), value = [int, int, int]
    where ints represent start times (row in matrix) for types of classes P, V and L respectively. If start time is -1
    it means that that subject does not have that type of class.
    :return: Data(groups, teachers, classes, classrooms)
    """
    with open(file_path, encoding='utf-8') as file:
        data = json.load(file)

    # classes: dictionary where key = index of a class, value = class
    classes = {}
    # classrooms: dictionary where key = index, value = classroom name
    classrooms = {}
    # teachers: dictionary where key = teachers' name, value = index
    teachers = {}
    teacher_codes = {}
    # groups: dictionary where key = name of the group, value = index
    groups = {}
    class_list = []

    for cl in data['slots']:
        new_group = cl['groups']
        new_teacher = cl['teacher']
        new_teacher_code = cl['teacher_code']

        # initialise for empty space of teachers
        if new_teacher not in teachers_empty_space:
            teachers_empty_space[new_teacher] = []

        new = Class(new_group, new_teacher, new_teacher_code, cl['subject'], cl['type'], cl['duration'], cl['classroom'])
        # add groups
        for group in new_group:
            if group not in groups:
                groups[group] = len(groups)
                # initialise for empty space of groups
                groups_empty_space[groups[group]] = []

        # add teacher
        if new_teacher not in teachers:
            teachers[new_teacher] = len(teachers)
        class_list.append(new)

    # shuffle mostly because of teachers
    random.shuffle(class_list)
    # add classrooms
    for cl in class_list:
        classes[len(classes)] = cl

    # every class is assigned a list of classrooms he can be in as indexes (later columns of matrix)
    for type in data['classrooms']:
        for name in data['classrooms'][type]:
            new = Classroom(name, type)
            classrooms[len(classrooms)] = new

    # every class has a list of groups marked by its index, same for classrooms
    for i in classes:
        cl = classes[i]

        classroom = cl.classrooms
        index_classrooms = []
        # add classrooms
        for index, c in classrooms.items():
            if c.type == classroom:
                index_classrooms.append(index)
        cl.classrooms = index_classrooms

        class_groups = cl.groups
        index_groups = []
        for name, index in groups.items():
            if name in class_groups:
                # initialise order of subjects
                if (cl.subject, index) not in subjects_order:
                    subjects_order[(cl.subject, index)] = [-1, -1, -1]
                index_groups.append(index)
        cl.groups = index_groups

    return Data(groups, teachers, classes, classrooms)


def set_up(num_of_columns):
    """
    Sets up the timetable matrix and dictionary that stores free fields from matrix.
    :param num_of_columns: number of classrooms
    :return: matrix, free
    """
    w, h = num_of_columns, 60  # 5 (workdays) * 12 (work hours) = 60
    matrix = [[None for x in range(w)] for y in range(h)]
    free = []

    # initialise free dict as all the fields from matrix
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            free.append((i, j))
    return matrix, free


def show_timetable(matrix):
    """
    Prints timetable matrix.
    """
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    # print heading for classrooms
    for i in range(len(matrix[0])):
        if i == 0:
            print('{:17s} C{:6s}'.format('', '0'), end='')
        else:
            print('C{:6s}'.format(str(i)), end='')
    print()

    d_cnt = 0
    h_cnt = 0
    for i in range(len(matrix)):
        day = days[d_cnt]
        hour = hours[h_cnt]
        print('{:10s} {:2d} ->  '.format(day, hour), end='')
        for j in range(len(matrix[i])):
            print('{:6s} '.format(str(matrix[i][j])), end='')
        print()
        h_cnt += 1
        if h_cnt == 12:
            h_cnt = 0
            d_cnt += 1
            print()


def write_solution_to_file(matrix, data, filled, file_path, groups_empty_space, teachers_empty_space, subjects_order):
    """
    Writes statistics and schedule to file in JSON format.
    """
    groups_dict = {}
    for group_name, group_index in data.groups.items():
        if group_index not in groups_dict:
            groups_dict[group_index] = group_name

    days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт']
    hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    schedule_data = []

    for class_index, times in filled.items():
        c = data.classes[class_index]
        groups = []
        for g in c.groups:
            groups.append(groups_dict[g])

        classroom = str(data.classrooms[times[0][1]])
        classroom_name = classroom[:classroom.rfind(' -')]

        time_slots = []
        for time in times:
            time_slots.append(hours[time[0] % 12])

        class_info = {
            "teacher": c.teacher,
            "teacher_code": c.teacher_code,
            "subject": c.subject,
            "groups": groups,
            "type": c.type,
            "duration_hours": c.duration,
            "classroom": classroom_name,
            "day": days[times[0][0] // 12],
            "timeslots": time_slots
        }

        schedule_data.append(class_info)

    # Write data to JSON file
    with open(file_path + "\\output.json", 'w', encoding='utf-8') as f:
        json.dump(schedule_data, f, ensure_ascii=False, indent=2)
