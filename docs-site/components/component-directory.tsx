'use client'

import { ArrowUpRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  COMPONENT_CATALOG,
  COMPONENT_IDS,
} from '../../src/demo/component-catalog'

export function ComponentDirectory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部分类')
  const filtered = COMPONENT_IDS.filter((id) => {
    const info = COMPONENT_CATALOG[id]
    return (
      (category === '全部分类' || info.category === category) &&
      `${info.title} ${info.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    )
  })
  return (
    <div className="component-directory not-prose">
      <div className="directory-filters">
        <label className="directory-search">
          <Search />
          <span className="sr-only">搜索组件</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索组件名称或用途…"
          />
        </label>
        <select
          aria-label="组件分类"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>全部分类</option>
          {Array.from(
            new Set(COMPONENT_IDS.map((id) => COMPONENT_CATALOG[id].category)),
          ).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      <p className="directory-count" aria-live="polite">
        {filtered.length} 个组件
      </p>
      <div className="directory-grid">
        {filtered.map((id) => {
          const info = COMPONENT_CATALOG[id]
          return (
            <Link
              href={`/docs/components/${id}/`}
              key={id}
              className="directory-item"
            >
              <div>
                <span>{info.category}</span>
                <ArrowUpRight />
              </div>
              <h2>{info.title}</h2>
              <p>{info.description}</p>
            </Link>
          )
        })}
      </div>
      {filtered.length === 0 && (
        <div className="directory-empty">
          <p>没有找到匹配的组件。</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('全部分类')
            }}
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  )
}
