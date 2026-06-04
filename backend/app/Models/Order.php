<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'product_id',
        'phone',
        'email',
        'message',
        'chest',
        'hips',
        'product_length',
        'height',
        'status',
        'taken_by',
        'taken_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

  public function takenBy()
  {
      return $this->belongsTo(User::class, 'taken_by');
  }
}
