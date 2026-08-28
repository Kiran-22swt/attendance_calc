import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.services import attendance_calc

def test_attendance_percent_basic():
    assert attendance_calc.attendance_percent(45, 60) == 75.0

def test_attendance_percent_zero_total():
    assert attendance_calc.attendance_percent(0, 0) == 0.0

def test_safe_bunks_example():
    assert attendance_calc.safe_bunks(45, 55, 75.0) == 5

def test_safe_bunks_zero_when_below():
    assert attendance_calc.safe_bunks(20, 50, 75.0) == 0

def test_recovery_example():
    assert attendance_calc.classes_needed_to_recover(30, 50, 75.0) == 30

def test_recovery_zero_when_already_safe():
    assert attendance_calc.classes_needed_to_recover(45, 55, 75.0) == 0

def test_status_boundaries():
    assert attendance_calc.status(74.9, 75.0) == "danger"
    assert attendance_calc.status(75.0, 75.0) == "warning"
    assert attendance_calc.status(79.9, 75.0) == "warning"
    assert attendance_calc.status(80.0, 75.0) == "safe"

def test_required_percent_zero_edge():
    assert attendance_calc.safe_bunks(10, 10, 0) > 1000

def test_required_percent_hundred_edge():
    assert attendance_calc.safe_bunks(10, 10, 100.0) == 0
    assert attendance_calc.classes_needed_to_recover(9, 10, 100.0) > 1000