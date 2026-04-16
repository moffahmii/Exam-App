export function ExamNavigation({
    currentIndex,
    total,
    onNext,
    onPrev,
    canNext,
    isSubmitting,
}) {
    return (
        <div className="flex gap-4 mt-6">
            <button onClick={onPrev} disabled={currentIndex === 0}>
                Previous
            </button>

            {currentIndex < total - 1 ? (
                <button onClick={onNext} disabled={!canNext}>
                    Next
                </button>
            ) : (
                <button type="submit" disabled={isSubmitting}>
                    Finish
                </button>
            )}
        </div>
    );
}