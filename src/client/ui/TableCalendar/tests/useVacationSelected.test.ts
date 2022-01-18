import { renderHook, act } from "@testing-library/react-hooks";
import { useVacationSelected } from "../useVacationSelected";

describe("useVacationSelected", () => {
  test("vacation start and vacation end should be the same, when date passed one time to handleVacationSelected", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-11-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() => useVacationSelected({}));

    act(() => {
      result.current.handleVacationSelected(new Date("1-11-2021"));
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("vacation start and vacation end should  be different, when date passed two times to handleVacationSelected", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-11-2021") };
    const expectedVacationEnd = { isSelected: true, date: new Date("1-15-2021") };

    const { result } = renderHook(() => useVacationSelected({}));
    act(() => {
      result.current.handleVacationSelected(new Date("1-11-2021"));
    });
    act(() => {
      result.current.handleVacationSelected(new Date("1-15-2021"));
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("vacation start and vacation end should be the same, when date passed three times to handleVacationSelected", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-21-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() => useVacationSelected({}));
    act(() => {
      result.current.handleVacationSelected(new Date("1-11-2021"));
    });
    act(() => {
      result.current.handleVacationSelected(new Date("1-15-2021"));
    });
    act(() => {
      result.current.handleVacationSelected(new Date("1-21-2021"));
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("vacation start and vacation end should be the same, when date passed in second time < date passed firstly", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-5-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() => useVacationSelected({}));
    act(() => {
      result.current.handleVacationSelected(new Date("1-11-2021"));
    });
    act(() => {
      result.current.handleVacationSelected(new Date("1-5-2021"));
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("should initialize vacation start and vacation end with provided values", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-5-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() =>
      useVacationSelected({
        initialVacationStart: {
          isSelected: true,
          date: new Date("1-5-2021"),
        },
        initialVacationEnd: {
          isSelected: false,
        },
      })
    );

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });
});
