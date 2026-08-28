import math

def attendance_percent(attended: int, total: int) -> float:
    if total <= 0:
        return 0.0
    return round((attended / total) * 100, 2)

def safe_bunks(attended: int, total: int, required_percent: float) -> int:
    if required_percent <= 0:
        return 10 ** 6  # effectively unlimited
    if required_percent >= 100:
        return 0
    required_decimal = required_percent / 100
    x = (attended / required_decimal) - total
    return max(0, math.floor(x))

def classes_needed_to_recover(attended: int, total: int, required_percent: float) -> int:
    required_decimal = required_percent / 100
    if required_decimal >= 1:
        return 10 ** 6  # 100% required, effectively impossible to recover if any absent
    numerator = (required_decimal * total) - attended
    denominator = 1 - required_decimal
    if denominator <= 0 or numerator <= 0:
        return 0
    return math.ceil(numerator / denominator)

def status(current_percent: float, required_percent: float) -> str:
    if current_percent < required_percent:
        return "danger"
    if current_percent < required_percent + 5:
        return "warning"
    return "safe"

def skip_preview(attended: int, total: int, required_percent: float) -> dict:
    current = attendance_percent(attended, total)
    if_present = attendance_percent(attended + 1, total + 1)
    if_absent = attendance_percent(attended, total + 1)
    bunks = safe_bunks(attended, total, required_percent)
    return {
        "current_percent": current,
        "percent_if_present": if_present,
        "percent_if_absent": if_absent,
        "safe_bunks_remaining": bunks,
    }