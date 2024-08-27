import json
import argparse


def validate_schedule(schedule):
    def create_key(entry):
        return entry['teacher'], entry['classroom'], tuple(entry['groups']), entry['day'], tuple(entry['timeslots'])

    conflicts = {
        "teacher": [],
        "group": [],
        "classroom": []
    }

    def check_conflict(entry, existing_entries, conflict_type):
        key = create_key(entry)
        for existing_entry, existing_index in existing_entries:
            existing_key = create_key(existing_entry)
            if key[3] == existing_key[3]:
                conflicting_timeslots = set(key[4]).intersection(set(existing_key[4]))
                if conflicting_timeslots:
                    common_groups = set(entry['groups']).intersection(set(existing_entry['groups']))
                    conflict_message = {
                        'message': (
                            f"Конфликт в поле {conflict_type} между группами {list(entry['groups'])} "
                            f"и {list(existing_entry['groups'])}. День недели: {entry['day']}."
                            f" Время: {list(conflicting_timeslots)}")
                    }
                    if conflict_type == 'group' and common_groups:
                        conflict_message['common_groups'] = list(common_groups)
                    conflicts[conflict_type].append(conflict_message)

    teachers = {}
    groups = {}
    classrooms = {}

    for index, entry in enumerate(schedule):
        teacher_key = (entry['teacher'], entry['day'])
        if teacher_key not in teachers:
            teachers[teacher_key] = []
        check_conflict(entry, teachers[teacher_key], "teacher")
        teachers[teacher_key].append((entry, index))

        for group in entry['groups']:
            group_key = (group, entry['day'])
            if group_key not in groups:
                groups[group_key] = []
            check_conflict(entry, groups[group_key], "group")
            groups[group_key].append((entry, index))

        classroom_key = (entry['classroom'], entry['day'])
        if classroom_key not in classrooms:
            classrooms[classroom_key] = []
        check_conflict(entry, classrooms[classroom_key], "classroom")
        classrooms[classroom_key].append((entry, index))

    return conflicts


def main():
    parser = argparse.ArgumentParser(description="Validate schedule JSON file for conflicts.")
    parser.add_argument("file_path")
    args = parser.parse_args()

    inputFile = "input.json"
    outputFile = "output.json"

    with open(args.file_path + inputFile, 'r', encoding='utf-8') as f:
        schedule = json.load(f)

    conflicts = validate_schedule(schedule)

    output = {
        "teacher_conflicts": conflicts["teacher"],
        "group_conflicts": conflicts["group"],
        "classroom_conflicts": conflicts["classroom"]
    }

    with open(args.file_path + outputFile, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
