<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSettings extends Model
{
    protected $fillable = [
        'image_path',
        'title',
        'subtitle',
    ];
}
