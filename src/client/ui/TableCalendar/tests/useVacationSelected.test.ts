import { act, renderHook } from "@testing-library/react-hooks";
import { useVacationSelected } from "../useVacationSelected";
import { VacationType } from "../../../../shared";

describe("useVacationSelected", () => {
  test("vacation start and vacation end should be the same, when date passed one time to handleVacationSelected", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-11-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() => useVacationSelected({}));

    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-11-2021"), vacations: [] });
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("vacation start and vacation end should  be different, when date passed two times to handleVacationSelected", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-11-2021") };
    const expectedVacationEnd = { isSelected: true, date: new Date("1-15-2021") };

    const { result } = renderHook(() => useVacationSelected({}));
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-11-2021"), vacations: [] });
    });
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-15-2021"), vacations: [] });
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("vacation start and vacation end should be the same, when date passed three times to handleVacationSelected", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-21-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() => useVacationSelected({}));
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-11-2021"), vacations: [] });
    });
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-15-2021"), vacations: [] });
    });
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-21-2021"), vacations: [] });
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("vacation start and vacation end should be the same, when date passed in second time < date passed firstly", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-5-2021") };
    const expectedVacationEnd = { isSelected: false };

    const { result } = renderHook(() => useVacationSelected({}));
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-11-2021"), vacations: [] });
    });
    act(() => {
      result.current.handleVacationSelected({ date: new Date("1-5-2021"), vacations: [] });
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("should initialize vacation start and vacation end with provided values", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-5-2021") };
    const expectedVacationEnd = { isSelected: true, date: new Date("1-15-2021") };

    const { result } = renderHook(() =>
      useVacationSelected({
        initialVacationStart: {
          isSelected: true,
          date: new Date("1-5-2021"),
        },
        initialVacationEnd: {
          isSelected: true,
          date: new Date("1-15-2021"),
        },
      })
    );

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });

  test("should select new start vacation date, when selected vacation start date < existing vacation start date and selected vacation end date > existing vacation end date", () => {
    const expectedVacationStart = { isSelected: true, date: new Date("1-15-2021") };
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

    act(() => {
      result.current.handleVacationSelected({
        date: new Date("1-15-2021"),
        vacations: [
          {
            start: new Date("1-7-2021"),
            end: new Date("1-14-2021"),
            id: "vacationId",
            userId: "userId",
            type: VacationType.PENDING_APPROVAL,
          },
        ],
      });
    });

    expect(result.current.vacationStart).toEqual(expectedVacationStart);
    expect(result.current.vacationEnd).toEqual(expectedVacationEnd);
  });
});
