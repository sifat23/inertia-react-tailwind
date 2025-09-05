<?php

namespace App\Enums;

enum ActivityAction: int
{
    case CREATED = 0;
    case UPDATED = 1;
    case DELETED = 2;

    public static function getArrayDerivatives(): array
    {
        $statusArray = [];

        foreach (self::cases() as $status) {
            $statusArray[$status->name] = $status->value;
        }

        return $statusArray;
    }
}
