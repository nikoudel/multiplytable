package controllers

import (
	"github.com/robfig/revel"
)

type Application struct {
	*rev.Controller
}

func (c Application) Tiles() rev.Result {
	return c.Render()
}