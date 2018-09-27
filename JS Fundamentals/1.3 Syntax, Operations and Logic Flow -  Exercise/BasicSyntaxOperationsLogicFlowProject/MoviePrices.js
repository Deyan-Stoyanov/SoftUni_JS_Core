function calculateMoviePrice([movie, day]) {
    switch (day.toLowerCase()) {
        case 'monday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 12;
                case 'schindler\'s list':
                    return 8.50;
                case 'casablanca':
                    return 8;
                case 'the wizard of oz':
                    return 10;
                default:
                    return 'error';
            }
        case 'tuesday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 10;
                case 'schindler\'s list':
                    return 8.50;
                case 'casablanca':
                    return 8;
                case 'the wizard of oz':
                    return 10;
                default:
                    return 'error';
            }
        case 'wednesday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 15;
                case 'schindler\'s list':
                    return 8.50;
                case 'casablanca':
                    return 8;
                case 'the wizard of oz':
                    return 10;
                default:
                    return 'error';
            }
        case 'thursday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 12.50;
                case 'schindler\'s list':
                    return 8.50;
                case 'casablanca':
                    return 8;
                case 'the wizard of oz':
                    return 10;
                default:
                    return 'error';
            }
        case 'friday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 15;
                case 'schindler\'s list':
                    return 8.50;
                case 'casablanca':
                    return 8;
                case 'the wizard of oz':
                    return 10;
                default:
                    return 'error';
            }
        case 'saturday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 25;
                case 'schindler\'s list':
                    return 15;
                case 'casablanca':
                    return 10;
                case 'the wizard of oz':
                    return 15;
                default:
                    return 'error';
            }
        case 'sunday':
            switch (movie.toLowerCase()) {
                case 'the godfather':
                    return 30;
                case 'schindler\'s list':
                    return 15;
                case 'casablanca':
                    return 10;
                case 'the wizard of oz':
                    return 15;
                default:
                    return 'error';
            }
        default:
            return 'error';
    }
}
