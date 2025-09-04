<?php

namespace App\Enums;

enum Status: int
{
    case INACTIVE = 0;
    case ACTIVE = 1;

    public static function getArrayDerivatives(): array
    {
        $statusArray = [];

        foreach (self::cases() as $status) {
            $statusArray[$status->name] = $status->value;
        }

        return $statusArray;
    }
}
